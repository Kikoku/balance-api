import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray
} from 'graphql-relay';
import { ResultLeagueConnection } from './ResultLeague';
import LeagueToUser from '../../../models/relationships/LeagueToUser';
import { nodeInterface  } from '../node';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField(),
    first: {
      type: GraphQLString
    },
    middle: {
      type: GraphQLString
    },
    last: {
      type: GraphQLString
    },
    dci: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString
    },
    leagues: {
      type: ResultLeagueConnection,
      args: connectionArgs,
      resolve: (user, args) => connectionFromPromisedArray(
        LeagueToUser.findAsync({userId: user.id}),
        args
      )
    }
  }),
  interfaces: () => [nodeInterface]
});

export const { connectionType: UserConnection } = connectionDefinitions({
  nodeType: UserType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of users in this connection.',
      resolve: (conn) => conn.edges.length
    }
  })
})

export default UserType;
