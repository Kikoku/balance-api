import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import jwt from 'jsonwebtoken';
import Organization from '../../../models/types/Organization';
import OrganizationType from '../types/Organization';
import TokenType from '../types/Token';
import { organizationLoader } from '../schemaHelpers';

export const logout = mutationWithClientMutationId({
  name: 'logout',
  inputFields: {
    organization: {
      type: GraphQLString
    }
  },
  outputFields: {
    success: {
      type: GraphQLInt,
      resolve: ({success}) => success
    }
  },
  mutateAndGetPayload: () => {
    return {
      success: 200
    };
  }
})
