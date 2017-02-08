import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import {
  connectionFromPromisedArray,
  connectionArgs
} from 'graphql-relay';
import {
  getObjectsByType,
  getObjectById
} from '../schemaHelpers.js';
import ViewerType from '../types/Viewer';
import { nodeField } from '../node';

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: ViewerType,
      resolve: (_, args, { viewer } ) => viewer
    }
  })
})
