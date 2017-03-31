import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';
import {
  mutationWithClientMutationId,
  fromGlobalId
} from 'graphql-relay';
import LeagueType from '../types/League';
import League from '../../../models/types/League';
import LeagueToOrg from '../../../models/relationships/LeagueToOrg';
import update from 'immutability-helper';

export const updateLeague = mutationWithClientMutationId({
  name: 'updateLeague',
  inputFields: {
    leagueId: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    completed: {
      type: GraphQLBoolean
    },
    startdate: {
      type: GraphQLString
    },
    enddate: {
      type: GraphQLString
    }
  },
  outputFields: {
    league: {
      type: LeagueType,
      resolve: ({league}) => league ? league : null
    },
    error: {
      type: GraphQLString,
      resolve: ({error}) => error
    }
  },
  mutateAndGetPayload: (args, context) => {
    if(context.viewer.id) {
      return LeagueToOrg.findOneAsync({
        orgId: fromGlobalId(context.viewer.id).id,
        leagueId: fromGlobalId(args.leagueId).id
      }).then(doc => {
        if(!doc) {
          return {
            error: 'Oops, there was an error updating'
          }
        } else {
          return League.findByIdAsync(doc.leagueId).then(league => {
            update(league, {
              $merge: args
            })

            return {
              league: league.saveAsync()
            }

          });
        }
      })
    } else {
      return {
        error: 'You must be logged in to perform this action'
      }
    }
  }
})
