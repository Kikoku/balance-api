import Promise from 'bluebird';
import User from '../../../../models/types/User';
import LeagueToUser from '../../../../models/relationships/LeagueToUser';

const getLeaguePlayerInfo = async (players, leagueId) => {

  players = await Promise.all(players)
  .map(player => {
    return User.findOrCreateAsync(player)
  })

  let leaguePlayers = await Promise.all(players)
  .map(player => {
    return LeagueToUser.findOrCreateAsync({
      userId: player.id,
      leagueId,
      win: 0,
      loss: 0,
      draw: 0,
      elo: 1600,
      change: 0,
      attendance: 1
    })
  })

  return players = await players.map(player => {
    let leagueData = leaguePlayers.find((lp) => lp.userId == player.id);

    let { win, loss, draw, elo, change, attendance } = leagueData
    let { id, first, last, middle, country, dci } = player

    return {
      id,
      first,
      last,
      middle,
      country,
      dci,
      win,
      loss,
      draw,
      elo,
      change,
      attendance
    }
  })
}

export default getLeaguePlayerInfo;
