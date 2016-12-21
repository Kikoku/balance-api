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
import EventToLeague from '../../../models/relationshipts/EventToLeauge';
import Event from '../../../models/types/Event';
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
      resolve: (league, args) => {
        return connectionFromPromisedArray(
          EventToLeague.findAsync({leagueId: league.id})
          .then(doc => Event.findAsync(doc.eventId)),
          args
        )
      }
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
