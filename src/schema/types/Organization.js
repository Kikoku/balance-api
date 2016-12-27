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

const OrganizationType = new GraphQLObjectType({
  name: 'Organization',
  fields: () => ({
    id: globalIdField(),
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString,
      resolve: () => null
    }
  }),
  interfaces: () => [nodeInterface]
});

export const { connectionType: OrganizationConnection } = connectionDefinitions({
  nodeType: OrganizationType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of organizations in this connection.',
      resolve: (conn) => conn.edges.length
    }
  })
})

export default OrganizationType;
