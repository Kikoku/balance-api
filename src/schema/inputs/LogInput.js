import {
  GraphQLInputObjectType,
  GraphQLString
} from 'graphql';

const LogInputType = new GraphQLInputObjectType({
  name: 'LogInput',
  fields: () => ({
    WERInfo: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString
    },
    operation: {
      type: GraphQLString
    }
  })
})

export default LogInputType;
