import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions
} from 'graphql-relay'
import { nodeInterface  } from '../node';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField(),
    first: {
      type: GraphQLString
    },
    middle: {
      type: GraphQLString
    },
    last: {
      type: GraphQLString
    },
    dci: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString
    }
  }),
  interfaces: [nodeInterface]
});

export const { connectionType: UserConnection } = connectionDefinitions({
  nodeType: UserType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of users in this connection.',
      resolve: (conn) => conn.edges.length
    }
  })
})

export default UserType;
