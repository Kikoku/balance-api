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
    error: {
      type: GraphQLString,
      resolve: ({error}) => error
    },
    token: {
      type: TokenType,
      resolve: ({access_token}) => {
        return access_token ? ({access_token}) : null;
      }
    },
    organization: {
      type: OrganizationType,
      resolve: ({orgId}) => {
        return orgId ? organizationLoader.load(orgId) : null;
      }
    }
  },
  mutateAndGetPayload: ({email, password}) => {

    return new Promise((resolve, reject) => {
      Organization.findOne({email: email})
      .populate('roles')
      .exec((err, org) => {
        if(org) {
          org.comparePassword(password, (err, isMatch) => {
            if(isMatch) {
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
        } else {
          resolve({
            error: 'Invalid credentials'
          })
        }
      })
    })
  }
})
