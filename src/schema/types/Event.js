import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray
} from 'graphql-relay';
import { MatchConnection } from './Match.js';
import MatchToEvent from '../../../models/relationships/MatchToEvent';
import OrganizationType from '../types/Organization';
import {
  matchLoader,
  organizationLoader
} from '../schemaHelpers';
import { nodeInterface  } from '../node';

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: globalIdField(),
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
    matches: {
      type: MatchConnection,
      args: connectionArgs,
      resolve: (event, args) => connectionFromPromisedArray(MatchToEvent.findAsync({eventId: event.id}).map(doc => matchLoader.load(doc.matchId)))
    },
    organization: {
      type: OrganizationType,
      resolve: (event, args) => organizationLoader.load(event.id)
    }
  }),
  interfaces: () => [nodeInterface]
});

export const { connectionType: EventConnection } = connectionDefinitions({
  nodeType: EventType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of events in this connection.',
      resolve: (conn) => conn.edges.length
    }
  })
})

export default EventType;
