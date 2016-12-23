import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import { newOrganization } from './newOrganization';
import { newUser } from './newUser';
import { newLeague } from './newLeague';

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    newOrganization,
    newUser,
    newLeague,
  })
})
