import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions
} from 'graphql-relay'
import { nodeInterface  } from '../node';

const LeagueType = new GraphQLObjectType({
  name: 'League',
  fields: () => ({
    id: globalIdField(),
    title: {
      type: GraphQLString
    },
    startdate: {
      type: GraphQLString
    },
    enddate: {
      type: GraphQLString
    }
  }),
  interfaces: () => [nodeInterface]
});

export const { connectionType: LeagueConnection } = connectionDefinitions({
  nodeType: LeagueType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of leagues in this connection.',
      resolve: (conn) => conn.edges.length
    }
  })
})

export default LeagueType;
