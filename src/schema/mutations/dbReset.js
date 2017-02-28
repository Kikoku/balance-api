import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import jwt from 'jsonwebtoken';
import EventToLog from '../../../models/relationships/EventToLog'
import EventToMatch from '../../../models/relationships/EventToMatch'
import EventToOrg from '../../../models/relationships/EventToOrg'
import EventToUser from '../../../models/relationships/EventToUser'
import LeagueToEvent from '../../../models/relationships/LeagueToEvent'
import LeagueToOrg from '../../../models/relationships/LeagueToOrg'
import LeagueToUser from '../../../models/relationships/LeagueToUser'
import MatchToUser from '../../../models/relationships/MatchToUser'
import Event from '../../../models/types/Event';
import League from '../../../models/types/League';
import Log from '../../../models/types/Log';
import Match from '../../../models/types/Match';
import User from '../../../models/types/User';

export const dbReset = mutationWithClientMutationId({
  name: 'dbReset',
  inputFields: {

  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: ({error}) => error
    }
  },
  mutateAndGetPayload: () => {
    EventToLog.removeAsync();
    EventToMatch.removeAsync();
    EventToOrg.removeAsync();
    EventToUser.removeAsync();
    LeagueToEvent.removeAsync();
    LeagueToOrg.removeAsync();
    LeagueToUser.removeAsync();
    MatchToUser.removeAsync();
    Event.removeAsync();
    League.removeAsync();
    Log.removeAsync();
    Match.removeAsync();
    User.removeAsync();
    return {
      error: 'done'
    }
  }
})
