import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql';
import {
  mutationWithClientMutationId,
  fromGlobalId
} from 'graphql-relay';
import Promise from 'bluebird';
import EventType from '../types/Event';
import EventInputType from '../inputs/EventInput';
import LogInputType from '../inputs/LogInput';
import PlayerInputType from '../inputs/PlayerInput';
import MatchInputType from '../inputs/MatchInput';
import {
  getLeaguePlayerInfo,
  calcEvent,
  saveLogs,
  saveMatches,
  savePlayers,
  saveLeague,
  saveOrg
 } from './helpers';
import Event from '../../../models/types/Event';

export const newEvent = mutationWithClientMutationId({
  name: 'newEvent',
  inputFields: {
    event: {
      type: new GraphQLNonNull(EventInputType)
    },
    leagueId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    logs: {
      type: new GraphQLNonNull(new GraphQLList(LogInputType))
    },
    players: {
      type: new GraphQLNonNull(new GraphQLList(PlayerInputType))
    },
    matches: {
      type: new GraphQLNonNull(new GraphQLList(MatchInputType))
    }
  },
  outputFields: {
    event: {
      type: EventType,
      resolve: ({event}) => event
    },
    error: {
      type: GraphQLString,
      resolve: ({error}) => error
    }
  },
  mutateAndGetPayload: async ({event, leagueId, logs, players, matches}, context ) => {

    if(context.viewer && context.viewer.roles.findIndex((role) => role.name === 'organization') > -1) {
      const {
        batchid,
        coordinator,
        eliminationType,
        enddate,
        eventguid,
        eventtypecode,
        format,
        iscasuallreportonly,
        isplayoff,
        isstarted,
        manualmatchround,
        notes,
        numberofrounds,
        playoffstartround,
        postevententry,
        sanctionnumber,
        seats,
        startdate,
        status,
        title
      } = event;

      leagueId = fromGlobalId(leagueId).id;

      players = await getLeaguePlayerInfo(players, leagueId);

      event.players = players;
      event.matches = matches;
      event.logs = logs;
      event = await calcEvent(event);

      let newEvent = new Event({
        batchid,
        coordinator,
        eliminationType,
        enddate,
        eventguid,
        eventtypecode,
        format,
        iscasuallreportonly,
        isplayoff,
        isstarted,
        manualmatchround,
        notes,
        numberofrounds,
        playoffstartround,
        postevententry,
        sanctionnumber,
        seats,
        startdate,
        status,
        title
      })

      let error = false;

      newEvent = await newEvent.saveAsync()
      .catch(err => {
          error = 'This Event has already been reported'
      });

      if (error) {
        return {
          error: error
        }
      } else {

        await saveLogs(event.logs, newEvent.id);
        await saveMatches(event.matches, newEvent.id);
        await savePlayers(event.players, newEvent.id, leagueId);
        await saveLeague(leagueId, newEvent.id);
        await saveLeague(process.env.ETERNAL_RANKING, newEvent.id);
        await saveOrg(context.viewer._id, newEvent.id);

        return {
          event: newEvent
        }

      }

    } else {
      return {
        error: 'Your account is not authorized to perform this action'
      }
    }
  }
})
