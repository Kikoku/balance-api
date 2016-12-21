import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray
} from 'graphql-relay';
import ResultMatchType from './ResultMatch';
import MatchToUser from '../../../models/relationships/MatchToUser';
import { nodeInterface  } from '../node';

const MatchType = new GraphQLObjectType({
  name: 'Match',
  fields: () => ({
    id: globalIdField(),
    round: {
      type: GraphQLInt
    },
    results: {
      type: new GraphQLList(ResultMatchType),
      resolve: (match) => MatchToUser.findAsync({matchId: match.id})
    }
  }),
  interfaces: () => [nodeInterface]
});

export const { connectionType: MatchConnection } = connectionDefinitions({
  nodeType: MatchType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of matches in this connection.',
      resolve: (conn) => conn.edges.length
    }
  })
})

export default MatchType;
