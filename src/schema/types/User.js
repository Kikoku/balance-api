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
import { ResultEventConnection } from './ResultEvent';
import { ResultMatchConnection } from './ResultMatch';
import LeagueToUser from '../../../models/relationships/LeagueToUser';
import EventToUser from '../../../models/relationships/EventToUser';
import MatchToUser from '../../../models/relationships/MatchToUser';
import { nodeInterface  } from '../node';
import SearchType from './Search';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField(),
    createdDate: {
      type: GraphQLString,
      resolve: (user) => user._id.getTimestamp()
    },
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
    },
    events: {
      type: ResultEventConnection,
      args: connectionArgs,
      resolve: (user, args) => connectionFromPromisedArray(
        EventToUser.findAsync({userId: user.id}),
        args
      )
    },
    matches: {
      type: ResultMatchConnection,
      args: connectionArgs,
      resolve: (user, args) => connectionFromPromisedArray(
          MatchToUser.findAsync( {$or: [{person: user._id}, {opponent: user._id}]}),
          args
        )
    }
  }),
  interfaces: () => [nodeInterface, SearchType]
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
