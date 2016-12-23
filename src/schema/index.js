import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql';
import {
  connectionFromPromisedArray,
  connectionArgs,
  mutationWithClientMutationId
} from 'graphql-relay';
import {
  userLoader,
  organzationLoader,
  matchLoader,
  leagueLoader,
  eventLoader,
  getObjectsByType,
  getObjectById
} from './schemaHelpers.js';
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
import LeagueToUser from '../../models/relationships/LeagueToUser';
import { nodeField } from './node';
import { mutationType } from './mutations';

const rootField = (GQLType, type) => {
  return {
    type: GQLType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: `ID of a ${type}`
      }
    },
    resolve: (_, args) => getObjectById(type, args.id)
  }
}

const rootConnection = (connection, type) => {
  return {
    type: connection,
    args: connectionArgs,
    resolve: (_, args) => connectionFromPromisedArray(
      getObjectsByType(type),
      args
    )
  }
}

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    user: rootField(UserType, 'user'),
    users: rootConnection(UserConnection, 'user'),
    organzation: rootField(OrganizationType, 'organization'),
    organizations: rootConnection(OrganizationConnection, 'organization'),
    match: rootField(MatchType, 'match'),
    matches: rootConnection(MatchConnection, 'match'),
    league:rootField(LeagueType, 'league'),
    leagues: rootConnection(LeagueConnection, 'league'),
    event: rootField(EventType, 'event'),
    events: rootConnection(EventConnection, 'event')
  })
})

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})
