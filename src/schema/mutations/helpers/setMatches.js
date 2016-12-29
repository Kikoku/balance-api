import Promise from 'bluebird';
import Match from '../../../../models/types/Match';
import MatchToUser from '../../../../models/relationships/MatchToUser';
import EventToMatch from '../../../../models/relationships/EventToMatch';
import LeagueToUser from '../../../../models/relationships/LeagueToUser';
import EventToUser from '../../../../models/relationships/EventToUser';

const eloUpdate = (result, pElo, oElo) => {
  let R = result;
  let E = .5 + ((pElo - oElo) * .001)

  let change = 12 * (R - E);

  if(change > 12) {
    change = 12;
  } else if (change < -12) {
    change = -12;
  }

  return parseInt(change.toFixed(2));
}

const setMatches = async (players, matches, eventId, leagueId) => {
  return Promise.all(matches.sort((a, b) => a.round > b.round ? 1 : a.round < b.round ? -1 : 0))
  .map(match => {

    const { round, PlayFormat, date, teamformat, win, loss, draw, outcome, winbydrop } = match;

    let matchPlayer = players.find(player => player.dci === match.person)
    let matchOpponent = players.find(player => player.dci === match.opponent)

    // TODO: User.findOneAsync(dci: 'BUY');
    if(!matchOpponent) {
      matchOpponent = {
        first: 'BUY',
        middle: 'BUY',
        last: 'BUY',
        dci: 'BUY',
        country: 'BUY',
        change: 0,
        win: 0,
        loss: 0,
        draw: 0,
        elo: 1600
      }
    }

    let playerElo = matchPlayer.elo;
    let opponentElo = matchOpponent.elo;

    let p1change = eloUpdate(match.outcome === '2' ? .5 : match.win > match.loss ? 1 : 0, playerElo, opponentElo);
    matchPlayer.change += p1change;
    matchPlayer.elo += p1change;
    if(match.outcome ==='2') {
      matchPlayer.draw += 1;
    } else if( match.win > match.loss) {
      matchPlayer.win += 1;
    } else {
      matchPlayer.loss += 1
    }

    let p2change = eloUpdate(match.outcome === '2' ? .5 : match.win < match.loss ? 1 : 0, opponentElo, playerElo);
    matchOpponent.change += p2change;
    matchOpponent.elo += p2change;
    if(match.outcome ==='2') {
      matchOpponent.draw += 1;
    } else if( match.win < match.loss) {
      matchOpponent.win += 1;
    } else {
      matchOpponent.loss += 1
    }

    let newMatch = new Match({
      round,
      PlayFormat,
      date,
      teamformat
    })
    newMatch.saveAsync()
    .then(matchResult => {

      let newMatchToUser = new MatchToUser({
        person: matchPlayer.id,
        opponent: matchOpponent.id,
        matchId: matchResult.id,
        win,
        loss,
        draw,
        p1elo: matchPlayer.elo,
        p1change,
        p2elo: matchOpponent.elo,
        p2change,
        outcome,
        winbydrop
      })
      newMatchToUser.saveAsync()

      let newEventToMatch = new EventToMatch({
        matchId: matchResult.id,
        eventId
      })
      newEventToMatch.saveAsync();

    })

  })
}

export default setMatches;
