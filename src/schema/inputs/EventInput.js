import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql';

const EventInputType = new GraphQLInputObjectType({
  name: 'EventInput',
  fields: () => ({
    batchid: {
      type: GraphQLString
    },
    coordinator: {
      type: GraphQLString
    },
    eliminationType: {
      type: GraphQLString
    },
    enddate: {
      type: GraphQLString
    },
    eventguid: {
      type: GraphQLString
    },
    eventtypecode: {
      type: GraphQLString
    },
    format: {
      type: GraphQLString
    },
    iscasuallreportonly: {
      type: GraphQLBoolean
    },
    isplayoff: {
      type: GraphQLBoolean
    },
    isstarted: {
      type: GraphQLBoolean
    },
    manualmatchround: {
      type: GraphQLInt
    },
    notes: {
      type: GraphQLString
    },
    numberofrounds: {
      type: GraphQLInt
    },
    playoffstartround: {
      type: GraphQLInt
    },
    postevententry: {
      type: GraphQLBoolean
    },
    sanctionnumber: {
      type: GraphQLString
    },
    seats: {
      type: GraphQLString
    },
    startdate: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    }
  })
})

export default EventInputType;
