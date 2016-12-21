import {
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay';
import UserType from './types/user';
import { getObjectById } from './schemaHelpers';

export const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    return getObjectById(type.toLowerCase(), id)
  },
  (object) => {
    if(object.name) {
      return UserType;
    }
    return null;
  }
)
