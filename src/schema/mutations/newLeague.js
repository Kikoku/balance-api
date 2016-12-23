import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';
import LeagueType from '../types/League';
import League from '../../../models/types/League';
import LeagueToOrg from '../../../models/relationships/LeagueToOrg';

export const newLeague = mutationWithClientMutationId({
  name: 'newLeague',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    startdate: {
      type: new GraphQLNonNull(GraphQLString)
    },
    enddate: {
      type: new GraphQLNonNull(GraphQLString)
    },
    organization: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    league: {
      type: LeagueType,
      resolve: (payload) => {
        return payload
      }
    }
  },
  mutateAndGetPayload: ({title, startdate, enddate, organization}) => {
    let newLeague = new League({
      title,
      startdate,
      enddate
    })
    return newLeague.saveAsync()
    .then( league => {
      let newLeagueToOrg = new LeagueToOrg({
        leagueId: league.id,
        orgId: organization
      })
      newLeagueToOrg.saveAsync();
      return league
    });
  }
})
