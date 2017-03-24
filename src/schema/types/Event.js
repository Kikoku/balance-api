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
import OrganizationType from './Organization';
import EventToOrg from '../../../models/relationships/EventToOrg';
import { ResultEventConnection } from './ResultEvent';
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
    createdDate: {
      type: GraphQLString,
      resolve: (event) => event._id.getTimestamp()
    },
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
      resolve: (event, args) => {
        return EventToOrg.findOneAsync({eventId: event.id}).then(doc => organizationLoader.load(doc.orgId))
      }
    },
    results: {
      type: ResultEventConnection,
      args: connectionArgs,
      resolve: (event, args) => connectionFromPromisedArray(
        EventToUser.findAsync({eventId: event.id}, null, {sort: {win: -1}}),
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
