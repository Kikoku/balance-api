import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

const RoleType = new GraphQLObjectType({
  name: 'Role',
  fields: () => ({
    name: {
      type: GraphQLString
    }
  })
});

export default RoleType;
