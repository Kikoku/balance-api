import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import EventType from '../types/Event';
import Event from '../../../models/types/Event';
import EventToOrg from '../../../models/relationships/EventToOrg';
import LeagueToEvent from '../../../models/relationships/LeagueToEvent';

export const newEvent = mutationWithClientMutationId({
  name: 'newEvent',
  inputFields: {
    eventguid: {
      type: GraphQLString
    },
    sanctionnumber: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    startdate: {
      type: GraphQLString
    },
    leagueId: {
      type: GraphQLString
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
  mutateAndGetPayload: ({title, startdate, sanctionnumber, eventguid, leagueId}, context ) => {

    if(context.viewer) {
      let newEvent = new Event({
        title,
        startdate,
        sanctionnumber,
        eventguid
      })
      return newEvent.saveAsync()
      .then( event => {
        let newEventToOrg = new EventToOrg({
          eventId: event.id,
          orgId: context.viewer.id
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
