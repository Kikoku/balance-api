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
import {
  userLoader,
  organzationLoader,
  matchLoader
} from './schemaHelpers.js'
import UserType, { UserConnection } from './types/User';
import OrganizationType, { OrganizationConnection } from './types/Organization';
import MatchType, { MatchConnection } from './types/Match';
import User from '../../models/types/User';
import Organization from '../../models/types/Organization';
import Match from '../../models/types/Match';
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
    },
    organzation: {
      type: OrganizationType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'ID of a Organization.'
        }
      },
      resolve: (_, args) => organzationLoader.load(args.id)
    },
    organizations: {
      type: OrganizationConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(
        Organization.findAsync(),
        args
      )
    },
    match: {
      type: MatchType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'ID of a Match.'
        }
      },
      resolve: (_, args) => matchLoader.load(args.id)
    },
    matches: {
      type: MatchConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(
        Match.findAsync(),
        args
      )
    }
  })
})

export default new GraphQLSchema({query: queryType})
