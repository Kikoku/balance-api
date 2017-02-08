import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import {
  connectionFromPromisedArray,
  connectionArgs
} from 'graphql-relay';
import {
  getObjectsByType,
  getObjectById
} from '../schemaHelpers.js';
import UserType, { UserConnection } from '../types/User';
import OrganizationType, { OrganizationConnection } from '../types/Organization';
import MatchType, { MatchConnection } from '../types/Match';
import LeagueType, { LeagueConnection } from '../types/League';
import EventType, { EventConnection } from '../types/Event';
import ViewerType from '../types/Viewer';
import { nodeField } from '../node';

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

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: ViewerType,
      resolve: (_, args, { viewer } ) => viewer
    },
    user: rootField(UserType, 'user'),
    users: rootConnection(UserConnection, 'user'),
    organization: rootField(OrganizationType, 'organization'),
    organizations: rootConnection(OrganizationConnection, 'organization'),
    match: rootField(MatchType, 'match'),
    matches: rootConnection(MatchConnection, 'match'),
    league:rootField(LeagueType, 'league'),
    leagues: rootConnection(LeagueConnection, 'league'),
    event: rootField(EventType, 'event'),
    events: rootConnection(EventConnection, 'event')
  })
})
