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
    orgId: {
      type: GraphQLString
    },
    leagueId: {
      type: GraphQLString
    }
  },
  outputFields: {
    event: {
      type: EventType,
      resolve: (payload) => {
        return payload
      }
    }
  },
  mutateAndGetPayload: ({title, startdate, sanctionnumber, eventguid, orgId, leagueId}) => {
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
        orgId
      })
      newEventToOrg.saveAsync();
      let newLeagueToEvent = new LeagueToEvent({
        eventId: event.id,
        leagueId
      })
      newLeagueToEvent.saveAsync();
      return event;
    });
  }
})
