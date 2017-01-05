import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions
} from 'graphql-relay';
import UserType from './User';
import LeagueType from './League';
import {
  userLoader,
  leagueLoader
} from '../schemaHelpers';
import { nodeInterface  } from '../node';

const ResultLeagueType = new GraphQLObjectType({
  name: 'ResultLeague',
  fields: () => ({
    id: globalIdField(),
    leagueId: {
      type: LeagueType,
      resolve: (result, args) => leagueLoader.load(result.leagueId)
    },
    person: {
      type: UserType,
      resolve: (result, args) => userLoader.load(result.userId)
    },
    win: {
      type: GraphQLInt
    },
    loss: {
      type: GraphQLInt
    },
    draw: {
      type: GraphQLInt
    },
    elo: {
      type: GraphQLInt
    },
    change: {
      type: GraphQLInt
    },
    attendance: {
      type: GraphQLInt
    }
  }),
  interfaces: () => [nodeInterface]
});

export const { connectionType: ResultLeagueConnection } = connectionDefinitions({
  nodeType: ResultLeagueType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of results in this connection.',
      resolve: (conn) => conn.edges.length
    }
  })
})

export default ResultLeagueType;
