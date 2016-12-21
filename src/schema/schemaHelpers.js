import DataLoader from 'dataloader';
import User from '../../models/types/user';

const getUserById = (id) => {
  return User.findByIdAsync(id)
}

const userLoader = new DataLoader(
  keys => Promise.all(keys.map(getUserById)),
  {
    cacheKeyFn: key => {
      return key.toString();
    }
  }
)

export default userLoader;

export const getObjectById = (type, id) => {

  const types = {
    user: getUserById
  }

  return types[type](id)
}
