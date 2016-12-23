import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import UserType from '../types/User';
import User from '../../../models/types/User';
import LeagueToUser from '../../../models/relationships/LeagueToUser';


export const newUser = mutationWithClientMutationId({
  name: 'newUser',
  inputFields: {
    first: {
      type: new GraphQLNonNull(GraphQLString)
    },
    middle: {
      type: GraphQLString
    },
    last: {
      type: new GraphQLNonNull(GraphQLString)
    },
    dci: {
      type: new GraphQLNonNull(GraphQLString)
    },
    country: {
      type: GraphQLString
    }
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: (payload) => User.findByIdAsync(payload.userId)
    }
  },
  mutateAndGetPayload: (args) => {
    let newUser = new User({
      middle: "",
      country: "",
      ...args
    });

    let overallLeague = new LeagueToUser({
      leagueId: "585aa055255630174895b98c",
      win: 0,
      loss: 0,
      draw: 0,
      elo: 1600,
      change: 0,
      attendance: 0
    })

    return newUser.saveAsync()
    .then(user => {

      overallLeague.userId = user.id;
      overallLeague.saveAsync();
      return {
        userId:user.id
      }
    })
  }
})
