import {
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay';
import UserType from './types/User';
import OrganizationType from './types/Organization';
import MatchType from './types/Match';
import EventType from './types/Event';
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
    if(object.password) {
      return OrganizationType;
    }
    if(object.round) {
      return MatchType;
    }
    if(object.eventguid) {
      return EventType;
    }
    if(object.title && !object.eventguid) {
      return LeaugeType;
    }
    return null;
  }
)
