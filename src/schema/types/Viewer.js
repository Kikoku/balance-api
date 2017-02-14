import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
  fromGlobalId
} from 'graphql-relay';
import {
  getObjectsByType,
  getObjectById
} from '../schemaHelpers.js';
import UserType, { UserConnection } from './User';
import OrganizationType, { OrganizationConnection } from './Organization';
import MatchType, { MatchConnection } from './Match';
import LeagueType, { LeagueConnection } from './League';
import EventType, { EventConnection } from './Event';
import RoleType from './Role';
import Role from '../../../models/types/Role';

const rootField = (GQLType, type) => {
  return {
    type: GQLType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: `ID of a ${type}`
      }
    },
    resolve: (_, args) => {
      const { id } = fromGlobalId(args.id);
      return (getObjectById(type, id))
    }
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

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    roles: {
      type: new GraphQLList(RoleType),
      resolve: (viewer, args) => viewer.roles.length > 1 ? Role.findAsync({_id: { $in: viewer.roles}}) : [{name: 'guest'}]
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
});

export default ViewerType;
