import {
  GraphQLInterfaceType,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} from 'graphql';
import EventType from './Event';
import LeagueType from './League';
import OrganizationType from './Organization';
import UserType from './User';
import {
  connectionDefinitions,
} from 'graphql-relay';


const SearchType = new GraphQLInterfaceType({
  name: 'Search',
  fields: {
    id: {
      type: GraphQLID
    },
    createdDate: {
      type: GraphQLString
    }
  },
  description: 'Search for things',
  resolveType: (data) => {
    if(data.dci) {
      return UserType
    }
    if(data.roles) {
      return OrganizationType
    }
    if(data.sanctionnumber) {
      return EventType
    }
    if(data.title && !data.sanctionnumber) {
      return LeagueType
    }
  }
})

export const { connectionType: SearchConnection } = connectionDefinitions({
  nodeType: SearchType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of items in this connection.',
      resolve: (conn) => conn.edges.length
    }
  })
})

export default SearchType;
