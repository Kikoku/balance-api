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

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: globalIdField(),
    eventguid: {
      type: GraphQLString
    },
    sanctionnumber: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    startdate: {
      type: GraphQLString
    }
  }),
  interfaces: () => [nodeInterface]
});

export const { connectionType: EventConnection } = connectionDefinitions({
  nodeType: EventType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of the total number of events in this connection.',
      resolve: (conn) => conn.edges.length
    }
  })
})

export default EventType;
