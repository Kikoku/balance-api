import DataLoader from 'dataloader';
import User from '../../models/types/User';
import Organization from '../../models/types/Organization';
import League from '../../models/types/League';
import Event from '../../models/types/Event';
import Match from '../../models/types/Match';
import { join } from 'bluebird';

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

const getEventById = (id) => {
  return Event.findByIdAsync(id)
}

export const eventLoader = new DataLoader(
  keys => Promise.all(keys.map(getEventById)),
  {
    cacheKeyFn: key => key.toString()
  }
)

const getMatchById = (id) => {
  return Match.findByIdAsync(id)
}

export const matchLoader = new DataLoader(
  keys => Promise.all(keys.map(getMatchById)),
  {
    cacheKeyFn: key => key.toString()
  }
)

export const SearchResult = ({ query }) => {

  if (query.length < 3) return null;

  // NOTE: query with 0-2 characters between each letter
  query = new RegExp(`${query.split("").join('+.{0,2}')}.*`, "i");

  return join(
    League.findAsync({
      $or: [
        { title: query },
      ]
    }),
    User.findAsync({
      $or: [
        { first: query },
        { middle: query },
        { last: query },
        { dci: query },
        { country: query },
      ]
    }),
    Event.findAsync({
      $or: [
        { coordinator: query },
        { eventguid: query },
        { sanctionnumber: query },
        { title: query },
      ]
    }),
    Organization.findAsync({
      $or: [
        { name: query },
        { email: query },
      ]
    })
  ).then(res => res.reduce((a, b) => {
    return a.concat(b);
  })).call('sort', (a, b) => a._id.getTimestamp() < b._id.getTimestamp() ? 1 : a._id.getTimestamp() > b._id.getTimestamp() ? -1 : 0 )
}

export const getObjectsByType = (type) => {

  const types = {
    user: User.findAsync(),
    organization: Organization.findAsync(),
    league: League.findAsync(),
    event: Event.findAsync(),
    match: Match.findAsync()
  }

  return types[type]
}

export const getObjectById = (type, id) => {

  const types = {
    user: getUserById,
    organization: getOrganizationById,
    league: getLeagueById,
    event: getEventById,
    match: getMatchById
  }

  return types[type](id)
}
