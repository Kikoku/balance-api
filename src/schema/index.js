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
  matchLoader,
  leagueLoader,
  eventLoader
} from './schemaHelpers.js'
import UserType, { UserConnection } from './types/User';
import OrganizationType, { OrganizationConnection } from './types/Organization';
import MatchType, { MatchConnection } from './types/Match';
import LeagueType, { LeagueConnection } from './types/League';
import EventType, { EventConnection } from './types/Event';
import User from '../../models/types/User';
import Organization from '../../models/types/Organization';
import Match from '../../models/types/Match';
import League from '../../models/types/League';
import Event from '../../models/types/Event';
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
    },
    league: {
      type: LeagueType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'ID of a League.'
        }
      },
      resolve: (_, args) => matchLoader.load(args.id)
    },
    leagues: {
      type: LeagueConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(
        League.findAsync(),
        args
      )
    },
    event: {
      type: EventType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'ID of an Event.'
        }
      },
      resolve: (_, args) => eventLoader.load(args.id)
    },
    events: {
      type: EventConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(
        Event.findAsync(),
        args
      )
    }
  })
})

export default new GraphQLSchema({query: queryType})
