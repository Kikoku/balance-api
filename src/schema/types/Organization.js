import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
} from 'graphql-relay'
import { nodeInterface  } from '../node';
import RoleType from './Role';
import Role from '../../../models/types/Role';
import { LeagueConnection } from './League';
import LeagueToOrg from '../../../models/relationships/LeagueToOrg';
import { EventConnection } from './Event';
import EventToOrg from '../../../models/relationships/EventToOrg';
import {
  leagueLoader,
  eventLoader,
} from '../schemaHelpers';

const OrganizationType = new GraphQLObjectType({
  name: 'Organization',
  fields: () => ({
    id: globalIdField('Organization'),
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString,
      resolve: () => null
    },
    roles: {
      type: new GraphQLList(RoleType),
      resolve: (org, args) => Role.findAsync({_id: { $in: org.roles}})
    },
    leagues: {
      type: LeagueConnection,
      args: connectionArgs,
      resolve: (org, args) => connectionFromPromisedArray(
        LeagueToOrg.findAsync({orgId: org.id}).map(doc => leagueLoader.load(doc.leagueId)),
        args
      )
    },
    events: {
      type: EventConnection,
      args: connectionArgs,
      resolve: (org, args) => connectionFromPromisedArray(
        EventToOrg.findAsync({orgId: org.id}).map(doc => eventLoader.load(doc.eventId)),
        args
      )
    },
  }),
  interfaces: () => [nodeInterface]
});

export const { connectionType: OrganizationConnection } = connectionDefinitions({
  nodeType: OrganizationType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of organizations in this connection.',
      resolve: (conn) => conn.edges.length
    }
  })
})

export default OrganizationType;
