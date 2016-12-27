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
    return Organization.findOneAsync({email: email})
    .then(org => {
      // TODO: create compare function and has password
      if(org.password === password) {
        // TODO: create jwt secret move to env variable
        return {
          access_token: jwt.sign(org, 'secret')
        }
      } else {
        return {
          error: 'Invalid credentials'
        }
      }
    })
  }
})
