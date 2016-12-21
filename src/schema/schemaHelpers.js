import DataLoader from 'dataloader';
import User from '../../models/types/User';

const getUserById = (id) => {
  return User.findByIdAsync(id)
}

export const userLoader = new DataLoader(
  keys => Promise.all(keys.map(getUserById)),
  {
    cacheKeyFn: key => key.toString()
  }
)


export const getObjectById = (type, id) => {

  const types = {
    user: getUserById
  }

  return types[type](id)
}
