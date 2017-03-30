import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import { newOrganization } from './newOrganization';
import { updateOrganization } from './updateOrganization';
import { newLeague } from './newLeague';
import { newEvent } from './newEvent';
import { login } from './login';
import { logout } from './logout';

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    newOrganization,
    updateOrganization,
    newLeague,
    newEvent,
    login,
    logout
  })
})
