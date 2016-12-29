import Promise from 'bluebird';
import Match from '../../../../models/types/Match';

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

const setMatches = async (players, matches, eventId) => {
  return Promise.all(matches)
  .map(match => {
    let playerElo = players.find(player => player.dci === match.person)
    let opponentElo = players.find(player => player.dci === match.opponent)

    if(!opponentElo) {
      opponentElo = {
        first: 'BUY',
        middle: 'BUY',
        last: 'BUY',
        dci: 'BUY',
        country: 'BUY',
        elo: 1600
      }
    }

    players = players.map(player => {
      if(player.dci === match.person) {
        let change = eloUpdate(match.outcome === '2' ? .5 : match.win > match.loss ? 1 : 0, playerElo.elo, opponentElo.elo);
        player.change += change;
        player.elo += change;
        if(match.outcome ==='2') {
          player.draw += 1;
        } else if( match.win > match.loss) {
          player.win += 1;
        } else {
          player.loss += 1
        }
      } else if(player.dci === match.opponent) {
        let change = eloUpdate(match.outcome === '2' ? .5 : match.win < match.loss ? 1 : 0, opponentElo.elo, playerElo.elo);
        player.change += change;
        player.elo += change;
        if(match.outcome === '2') {
          player.draw += 1;
        } else if (match.win < match.loss) {
          player.win += 1;
        } else {
          player.loss +=1;
        }
      }
      return player;
    })

    return players;
  })
}

export default setMatches;
