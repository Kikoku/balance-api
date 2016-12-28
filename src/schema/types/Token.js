import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

const TokenType = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    access_token: {
      type: GraphQLString
    }
  })
});

export default TokenType;
