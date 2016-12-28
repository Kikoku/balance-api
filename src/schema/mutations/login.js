import {
  GraphQLNonNull,
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

export const login = mutationWithClientMutationId({
  name: 'login',
  inputFields: {
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  },
  outputFields: {
    token: {
      type: TokenType,
      resolve: ({access_token}) => ({access_token})
    },
    organization: {
      type: OrganizationType,
      resolve: ({orgId}) => orgId ? organizationLoader.load(orgId) : null
    },
    error: {
      type: GraphQLString,
      resolve: ({error}) => error
    }
  },
  mutateAndGetPayload: ({email, password}) => {

    return new Promise((resolve, reject) => {
      Organization.findOne({email: email})
      .populate('roles')
      .exec((err, org) => {
        if(org.password === password) {
          resolve({
            orgId: org.id,
            access_token: jwt.sign(org, process.env.JWT_SECRET)
          })
        } else {
          resolve({
            error: 'Invalid credentials'
          })
        }
      })
    })
  }
})
