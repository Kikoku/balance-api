import { GraphQLSchema} from 'graphql';
import { queryType } from './queries';
import { mutationType } from './mutations';

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})
