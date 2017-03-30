import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {
  mutationWithClientMutationId,
  fromGlobalId
} from 'graphql-relay';
import OrganizationType from '../types/Organization';
import Organization from '../../../models/types/Organization';
import update from 'immutability-helper';

export const updateOrganization = mutationWithClientMutationId({
  name: 'updateOrganization',
  inputFields: {
    email: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    street: {
      type: GraphQLString
    },
    city: {
      type: GraphQLString
    },
    state: {
      type: GraphQLString
    },
    zip: {
      type: GraphQLString
    },
    phone: {
      type: GraphQLString
    }
  },
  outputFields: {
    organization: {
      type: OrganizationType,
      resolve: (payload) => payload.name ? payload : null
    },
    error: {
      type: GraphQLString,
      resolve: ({error}) => error
    }
  },
  mutateAndGetPayload: (args, context) => {
    if(context.viewer.id) {
      return Organization.findById(fromGlobalId('T3JnYW5pemF0aW9uOjU4NWFhMTNkMjU1NjMwMTc0ODk1Yjk4Zg==').id)
      .then(org => {
        update(org, {
          $merge: args
        })
        return org.saveAsync();
      })

    } else {
      return {
        error: 'You must be logged in to perform this action'
      }
    }

  }
})
