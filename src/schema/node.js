import {
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay';
import UserType from './types/User';
import OrganizationType from './types/Organization'
import { getObjectById } from './schemaHelpers';

export const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    return getObjectById(type.toLowerCase(), id)
  },
  (object) => {
    if(object.dci) {
      return UserType;
    }
    return null;
  }
)
