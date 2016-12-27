import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { organizationLoader } from '../schemaHelpers';
import OrganizationType from './Organization';

const TokenType = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    orgId: {
      type: OrganizationType,
      resolve: (token) => organizationLoader.load(token.orgId)
    },
    access_token: {
      type: GraphQLString
    },
    error: {
      type: GraphQLString
    }
  })
});

export default TokenType;
