import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import OrganizationType from '../types/Organization';
import Organization from '../../../models/types/Organization';
import Role from '../../../models/types/Role';

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
  mutateAndGetPayload: ({name, email, password}, context) => {
    if(context.viewer) {
      if(context.viewer.roles.findIndex((role) => role.name === 'admin') > -1) {
        return Role.findOneAsync({name: 'organization'})
        .then(role => {
          let newOrg = new Organization({
            name,
            email,
            password,
            roles: [role.id]
          })
          return newOrg.saveAsync();
        })
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
//
//
