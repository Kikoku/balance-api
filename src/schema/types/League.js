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
import EventToLeague from '../../../models/relationships/EventToLeauge';
import Event from '../../../models/types/Event';
import { OrganizationConnection } from './Organization';
import OrgToLeague from '../../../models/relationships/OrgToLeague';
import Organization from '../../../models/types/Organization';
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
        EventToLeague.findAsync({leagueId: league.id}).then(doc => Event.findAsync(doc.eventId)),
        args
      )
    },
    organizations: {
      type: OrganizationConnection,
      args: connectionArgs,
      resolve: (league, args) => connectionFromPromisedArray(
        OrgToLeague.findAsync({leagueId: league.id}).then(doc => Organization.findAsync(doc.orgId)),
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
