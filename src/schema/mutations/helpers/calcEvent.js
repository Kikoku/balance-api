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

const calcEvent = async (event) => {
  event.matches = event.matches.map(match => {
    let p1 = event.players.find(player => player.dci === match.person)
    let p2 = match.opponent ? event.players.find(player => player.dci === match.opponent) : {
      dci: "BUY",
      win: 0,
      loss: 0,
      draw: 0,
      elo: 1600,
      change: 0
    }

    match.p1change = eloUpdate(match.outcome === '2' ? .5 : match.win > match.loss ? 1 : 0, p1.elo, p2.elo);
    match.p1elo = p1.elo + match.p1change;
    match.p1Id = p1.id;

    if(p2.dci !== "BUY") {
      match.p2change = eloUpdate(match.outcome === '2' ? .5 : match.win < match.loss ? 1 : 0, p2.elo, p1.elo);
      match.p2elo = p2.elo + match.p2change;
      match.p2Id = p2.id;
    }

    event.players = event.players.map(player => {
      if(player.dci === match.person) {
        player.elo += match.p1change;
        player.change += match.p1change;
      } else if(player.dci === match.opponent) {
        player.elo += match.p2change;
        player.change += match.p2change;
      }
      return player
    })

    return match

  })
  return event;
}

export default calcEvent;
