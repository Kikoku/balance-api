import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import OrganizationType from '../types/Organization';
import Organization from '../../../models/types/Organization';

export const newOrganization = mutationWithClientMutationId({
  name: 'newOrganization',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    organization: {
      type: OrganizationType,
      resolve: (payload) => payload
    }
  },
  mutateAndGetPayload: (args) => {
    let newOrg = new Organization(args)
    return newOrg.saveAsync();
  }
})
