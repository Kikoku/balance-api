import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import EventType from '../types/Event';
import Event from '../../../models/types/Event';
import EventToOrg from '../../../models/relationships/EventToOrg';
import LeagueToEvent from '../../../models/relationships/LeagueToEvent';
import EventInputType from '../inputs/EventInput';
import LogInputType from '../inputs/LogInput';
import PlayerInputType from '../inputs/PlayerInput';
import MatchInputType from '../inputs/MatchInput';

export const newEvent = mutationWithClientMutationId({
  name: 'newEvent',
  inputFields: {
    event: {
      type: new GraphQLNonNull(EventInputType)
    },
    leagueId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    logs: {
      type: new GraphQLNonNull(new GraphQLList(LogInputType))
    },
    players: {
      type: new GraphQLNonNull(new GraphQLList(PlayerInputType))
    },
    matches: {
      type: new GraphQLNonNull(new GraphQLList(MatchInputType))
    }
  },
  outputFields: {
    event: {
      type: EventType,
      resolve: ({event}) => event
    },
    error: {
      type: GraphQLString,
      resolve: ({error}) => error
    }
  },
  mutateAndGetPayload: ({event, leagueId, logs, players, matches}, context ) => {

    if(context.viewer) {
      let newEvent = new Event(event)
      return newEvent.saveAsync()
      .then( event => {
        let newEventToOrg = new EventToOrg({
          eventId: event.id,
          orgId: context.viewer._id
        })
        newEventToOrg.saveAsync();
        let newLeagueToEvent = new LeagueToEvent({
          eventId: event.id,
          leagueId
        })
        newLeagueToEvent.saveAsync();
        return {event};
      });
    } else {
      return {
        error: 'Your account is not authorized to perform this action'
      }
    }
  }
})
