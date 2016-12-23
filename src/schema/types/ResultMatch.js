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
import MatchType from './Match';
import {
  userLoader,
  matchLoader
} from '../schemaHelpers';
import { nodeInterface  } from '../node';

const ResultMatchType = new GraphQLObjectType({
  name: 'ResultMatch',
  fields: () => ({
    id: globalIdField(),
    matchId: {
      type: MatchType,
      resolve: (result, args) => matchLoader.load(result.matchId)
    },
    player: {
      type: UserType,
      resolve: (result, args) => userLoader.load(result.player)
    },
    opponent: {
      type: UserType,
      resolve: (result, args) => userLoader.load(result.opponent)
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
    }
  }),
  interfaces: () => [nodeInterface]
});

export const { connectionType: ResultMatchConnection } = connectionDefinitions({
  nodeType: ResultMatchType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of results in this connection.',
      resolve: (conn) => conn.edges.length
    }
  })
})

export default ResultMatchType;
