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
import { EventConnection } from './Event';
import LeagueToEvent from '../../../models/relationships/LeagueToEvent';
import { OrganizationConnection } from './Organization';
import LeagueToOrg from '../../../models/relationships/LeagueToOrg';
import { ResultLeagueConnection } from './ResultLeague';
import LeagueToUser from '../../../models/relationships/LeagueToUser';
import {
  eventLoader,
  organizationLoader,
  userLoader
} from '../schemaHelpers';
import { nodeInterface  } from '../node';

const LeagueType = new GraphQLObjectType({
  name: 'League',
  fields: () => ({
    id: globalIdField(),
    title: {
      type: GraphQLString
    },
    startdate: {
      type: GraphQLString
    },
    enddate: {
      type: GraphQLString
    },
    events: {
      type: EventConnection,
      args: connectionArgs,
      resolve: (league, args) => connectionFromPromisedArray(
        LeagueToEvent.findAsync({leagueId: league.id}).map(doc => eventLoader.load(doc.eventId)),
        args
      )
    },
    organizations: {
      type: OrganizationConnection,
      args: connectionArgs,
      resolve: (league, args) => connectionFromPromisedArray(
        LeagueToOrg.findAsync({leagueId: league.id}).map(doc => organizationLoader.load(doc.orgId)),
        args
      )
    },
    users: {
      type: ResultLeagueConnection,
      args: connectionArgs,
      resolve: (league, args) => connectionFromPromisedArray(
        LeagueToUser.findAsync({leagueId: league.id}, null, {sort: {elo: -1}}),
        args
      )
    }
  }),
  interfaces: () => [nodeInterface]
});

export const { connectionType: LeagueConnection } = connectionDefinitions({
  nodeType: LeagueType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of leagues in this connection.',
      resolve: (conn) => conn.edges.length
    }
  })
})

export default LeagueType;
