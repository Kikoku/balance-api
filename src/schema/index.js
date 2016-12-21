import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import {
  connectionFromPromisedArray,
  connectionArgs
} from 'graphql-relay';
import { userLoader } from './schemaHelpers.js'
import UserType, { UserConnection } from './types/User';
import User from '../../models/types/User';
import { nodeField } from './node';

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'ID of a User.'
        }
      },
      resolve: (_, args) => userLoader.load(args.id)
    },
    users: {
      type: UserConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(
        User.findAsync(),
        args
      )
    }
  })
})

export default new GraphQLSchema({query: queryType})
