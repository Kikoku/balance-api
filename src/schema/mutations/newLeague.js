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
    }
  },
  outputFields: {
    league: {
      type: LeagueType,
      resolve: ({league}) => league
    },
    error: {
      type: GraphQLString,
      resolve: ({error}) => error
    }
  },
  mutateAndGetPayload: ({title, startdate, enddate}, context) => {
    if(context.viewer) {
      let newLeague = new League({
        title,
        startdate,
        enddate
      })
      return newLeague.saveAsync()
      .then( league => {
        let newLeagueToOrg = new LeagueToOrg({
          leagueId: league.id,
          orgId: context.viewer.id
        })
        newLeagueToOrg.saveAsync();
        return {league}
      });
    } else {
      return {
        error: 'Your account is not authorized to create new Leagues'
      }
    }
  }
})
