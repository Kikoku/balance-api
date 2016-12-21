import DataLoader from 'dataloader';
import User from '../../models/types/User';
import Organization from '../../models/types/Organization';
import League from '../../models/types/League';
import Match from '../../models/types/Match';

const getUserById = (id) => {
  return User.findByIdAsync(id)
}

export const userLoader = new DataLoader(
  keys => Promise.all(keys.map(getUserById)),
  {
    cacheKeyFn: key => key.toString()
  }
)

const getOrganizationById = (id) => {
  return Organization.findByIdAsync(id)
}

export const organizationLoader = new DataLoader(
  keys => Promise.all(keys.map(getOrganizationById)),
  {
    cacheKeyFn: key => key.toString()
  }
)

const getLeagueById = (id) => {
  return League.findByIdAsync(id)
}

export const leagueLoader = new DataLoader(
  keys => Promise.all(keys.map(getLeagueById)),
  {
    cacheKeyFn: key => key.toString()
  }
)

  return Match.findByIdAsync(id)
}

export const matchLoader = new DataLoader(
  keys => Promise.all(keys.map(getMatchById)),
  {
    cacheKeyFn: key => key.toString()
  }
)

export const getObjectById = (type, id) => {

  const types = {
    user: getUserById,
    organization: getOrganizationById,
    league: getLeagueById,
    match: getMatchById
  }

  return types[type](id)
}
