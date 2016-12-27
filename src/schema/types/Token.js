import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

const TokenType = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    access_token: {
      type: GraphQLString
    },
    error: {
      type: GraphQLString
    }
  })
});

export default TokenType;
