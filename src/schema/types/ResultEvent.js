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

const ResultEventType = new GraphQLObjectType({
  name: 'ResultEvent',
  fields: () => ({
    id: globalIdField(),
    player: {
      type: UserType,
      resolve: (result, args) => userLoader.load(result.player)
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
  interfaces: () => [ nodeInterface ]
});

export const { connectionType: ResultEventConnection } = connectionDefinitions({
  nodeType: ResultEventType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of results in this connection.',
      resolve: (conn) => conn.edges.length
    }
  })
})

export default ResultEventType;
