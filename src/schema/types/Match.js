import {
  GraphQLObjectType,
  GraphQLInt
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions
} from 'graphql-relay'
import { nodeInterface  } from '../node';

const MatchType = new GraphQLObjectType({
  name: 'Match',
  fields: () => ({
    id: globalIdField(),
    round: {
      type: GraphQLInt
    }
  }),
  interfaces: () => [nodeInterface]
});

export const { connectionType: MatchConnection } = connectionDefinitions({
  nodeType: MatchType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of matches in this connection.',
      resolve: (conn) => conn.edges.length
    }
  })
})

export default MatchType;
