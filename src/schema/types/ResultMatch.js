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
import {
  userLoader
} from '../schemaHelpers';
import { nodeInterface  } from '../node';

const ResultMatchType = new GraphQLObjectType({
  name: 'ResultMatch',
  fields: () => ({
    id: globalIdField(),
    userId: {
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
