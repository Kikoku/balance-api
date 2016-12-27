import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import jwt from 'jsonwebtoken';
import Organization from '../../../models/types/Organization';
import TokenType from '../types/Token';

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
      resolve: (payload) => {
        return payload
      }
    }
  },
  mutateAndGetPayload: ({email, password}) => {

    return new Promise((resolve, reject) => {
      Organization.findOne({email: email})
      .populate('roles')
      .exec((err, org) => {
        if(org.password === password) {
          // TODO: create jwt secret move to env variable
          resolve({
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
