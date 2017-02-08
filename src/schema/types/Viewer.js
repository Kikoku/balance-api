import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions
} from 'graphql-relay'
import RoleType from './Role';
import Role from '../../../models/types/Role';

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    roles: {
      type: new GraphQLList(RoleType),
      resolve: (viewer, args) => viewer.roles.length > 1 ? Role.findAsync({_id: { $in: viewer.roles}}) : [{name: 'guest'}]
    }
  })
});

export default ViewerType;
