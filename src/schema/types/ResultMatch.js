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
    person: {
      type: UserType,
      resolve: (result, args) => userLoader.load(result.person)
    },
    opponent: {
      type: UserType,
      resolve: (result, args) => result.opponent ? userLoader.load(result.opponent) : null
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
    p1elo: {
      type: GraphQLInt
    },
    p1change: {
      type: GraphQLInt
    },
    p2elo: {
      type: GraphQLInt
    },
    p2change: {
      type: GraphQLInt
    },
    outcome: {
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
