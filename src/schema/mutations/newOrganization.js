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
    },
    error: {
      type: GraphQLString,
      resolve: ({error}) => error
    }
  },
  mutateAndGetPayload: (args, context) => {
    if(context.viewer) {
      if(context.viewer.roles.findIndex((role) => role.name === 'admin') > -1) {
        let newOrg = new Organization(args)
        return newOrg.saveAsync();
      } else {
        return {
          error: 'Your account is not authorized to perform this action'
        }
      }
    } else {
      return {
        error: 'Your account is not authorized to perform this action'
      }
    }

  }
})
