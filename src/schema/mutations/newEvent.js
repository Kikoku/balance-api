import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import Promise from 'bluebird';
import EventType from '../types/Event';
import EventInputType from '../inputs/EventInput';
import LogInputType from '../inputs/LogInput';
import PlayerInputType from '../inputs/PlayerInput';
import MatchInputType from '../inputs/MatchInput';
import {
  getLeaguePlayerInfo,
  calcEvent
 } from './helpers';
import User from '../../../models/types/User';
import Match from '../../../models/types/Match';
import Event from '../../../models/types/Event';
import Log from '../../../models/types/Log';
import EventToMatch from '../../../models/relationships/EventToMatch';
import MatchToUser from '../../../models/relationships/MatchToUser';
import EventToUser from '../../../models/relationships/EventToUser';
import LeagueToUser from '../../../models/relationships/LeagueToUser';
import LeagueToEvent from '../../../models/relationships/LeagueToEvent';
import EventToOrg from '../../../models/relationships/EventToOrg';
import EventToLog from '../../../models/relationships/EventToLog';

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

    if(context.viewer) {
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
      return newEvent.saveAsync()
      .then(savedEvent => {

        event.logs.map(log => {
          let newLog = new Log(log)
          newLog.saveAsync()
          .then(savedLog => {
            let newEventToLog = new EventToLog({
              logId: savedLog.id,
              eventId: savedEvent.id
            })
          })
        })

        event.matches.map(match => {
          let newMatch = new Match({
            round: match.round,
            PlayFormat: match.PlayFormat,
            date: match.date,
            teamformat: match.teamformat
          })
          newMatch.saveAsync()
          .then(savedMatch => {
            let newEventToMatch = new EventToMatch({
              matchId: savedMatch.id,
              eventId: savedEvent.id
            })
            newEventToMatch.saveAsync();

            let newMatchToUser = new MatchToUser({
              person: match.p1Id,
              opponent: match.p2Id,
              matchId: savedMatch.id,
              win: match.win,
              loss: match.loss,
              draw: match.draw,
              p1elo: match.p1elo,
              p1change: match.p1change,
              p2elo: match.p2elo,
              p2change: match.p2change,
              outcome: match.outcome,
              windbydrop: match.winbydrop
            })
            newMatchToUser.saveAsync();
          })
        })

        event.players.map(player => {
          let newEventToUser = new EventToUser({
            userId: player.id,
            eventId: savedEvent.id,
            win: player.win,
            loss: player.loss,
            draw: player.draw,
            elo: player.elo,
            change: player.change
          })
          newEventToUser.saveAsync();

          let newLeagueToUser = new LeagueToUser({
            userId: player.id,
            eventId: savedEvent.id,
            win: player.win,
            loss: player.loss,
            draw: player.draw,
            elo: player.elo,
            change: player.change,
            attendance: player.attendance
          })
          newLeagueToUser.saveAsync();
        })

        let newLeagueToEvent = new LeagueToEvent({
          leagueId,
          eventId: savedEvent.id
        })
        newLeagueToEvent.saveAsync();

        let newEventToOrg = new EventToOrg({
          eventId: savedEvent.id,
          orgId: context.viewer._id
        })
        newEventToOrg.saveAsync()
        return {event: savedEvent}
      })
    } else {
      return {
        error: 'Your account is not authorized to perform this action'
      }
    }
  }
})
