import Promise from 'bluebird';
import Log from '../../../../models/types/Log';
import EventToLog from '../../../../models/relationships/EventToLog';
import Match from '../../../../models/types/Match';
import EventToMatch from '../../../../models/relationships/EventToMatch';
import MatchToUser from '../../../../models/relationships/MatchToUser';
import EventToUser from '../../../../models/relationships/EventToUser';
import LeagueToUser from '../../../../models/relationships/LeagueToUser';
import LeagueToEvent from '../../../../models/relationships/LeagueToEvent';
import EventToOrg from '../../../../models/relationships/EventToOrg';


export const saveLogs = (logs, eventId) => {
  logs.map(log => {
    let newLog = new Log(log)
    newLog.saveAsync()
    .then(savedLog => {
      let newEventToLog = new EventToLog({
        logId: savedLog.id,
        eventId
      })
      newEventToLog.saveAsync();
    })
  })
}

export const saveMatches = (matches, eventId) => {
  return Promise.all(matches)
  .map(match => {
    let newMatch = new Match({
      round: match.round,
      PlayFormat: match.PlayFormat,
      date: match.date,
      teamformat: match.teamformat
    })
    return newMatch.saveAsync()
    .then(async (m) => {

      let newEventToMatch = new EventToMatch({
        matchId: m._id,
        eventId
      })
      await newEventToMatch.saveAsync();

      let newMatchToUser = new MatchToUser({
        person: match.p1Id,
        opponent: match.p2Id,
        matchId: m._id,
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
      await newMatchToUser.saveAsync();

    })
  })
}

export const savePlayers = (players, eventId, leagueId) => {
  players.map(player => {
    let newEventToUser = new EventToUser({
      userId: player.id,
      eventId,
      win: player.win,
      loss: player.loss,
      draw: player.draw,
      elo: player.elo,
      change: player.change
    })
    newEventToUser.saveAsync();

    LeagueToUser.findAsync({
      userId: player.id,
      leagueId: {
        $in: [
          leagueId,
          process.env.ETERNAL_RANKING
        ]
      }
    }).map(user => {
      user.win += player.win;
      user.loss += player.loss;
      user.draw += player.draw;
      user.elo += player.change;
      user.change = player.change;
      user.attendance++;

      return user.saveAsync()

    })
  })
}

export const saveLeague = (leagueId, eventId) => {
  let newLeagueToEvent = new LeagueToEvent({
    leagueId,
    eventId
  })
  newLeagueToEvent.saveAsync();
}

export const saveOrg = (orgId, eventId) => {
  let newEventToOrg = new EventToOrg({
    eventId,
    orgId
  })
  newEventToOrg.saveAsync();
}
