import {
  GraphQLInputObjectType,
  GraphQLString
} from 'graphql';

const PlayerInputType = new GraphQLInputObjectType({
  name: 'PlayerInput',
  fields: () => ({
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
    }
  })
})

export default PlayerInputType;
