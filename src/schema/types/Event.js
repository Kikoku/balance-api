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
import { MatchConnection } from './Match';
import EventToMatch from '../../../models/relationships/EventToMatch';
import OrganizationType from '../types/Organization';
import EventToOrg from '../../../models/relationships/EventToOrg';
import { UserConnection } from './User';
import EventToUser from '../../../models/relationships/EventToUser';
import {
  matchLoader,
  organizationLoader,
  userLoader
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
      resolve: (event, args) => connectionFromPromisedArray(
        EventToMatch.findAsync({eventId: event.id}).map(doc => matchLoader.load(doc.matchId)),
        args
      )
    },
    organization: {
      type: OrganizationType,
      resolve: (event, args) => EventToOrg.findOneAsync({eventId: event.id}).then(doc => organizationLoader.load(doc.orgId))
    },
    users: {
      type: UserConnection,
      resolve: (event, args) => connectionFromPromisedArray(
        EventToUser.findAsync({eventId: event.id}).map(doc => userLoader.load(doc.userId)),
        args
      )
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
