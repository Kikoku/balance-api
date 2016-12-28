import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import { newOrganization } from './newOrganization';
import { newLeague } from './newLeague';
import { newEvent } from './newEvent';
import { login } from './login';

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    newOrganization,
    newLeague,
    newEvent,
    login
  })
})
