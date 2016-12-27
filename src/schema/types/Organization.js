import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions
} from 'graphql-relay'
import { nodeInterface  } from '../node';
import RoleType from './Role';
import Role from '../../../models/types/Role';

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
    },
    roles: {
      type: new GraphQLList(RoleType),
      resolve: (org, args) => Role.findAsync({_id: { $in: org.roles}})
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
