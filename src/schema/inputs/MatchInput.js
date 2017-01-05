import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

const MatchInputType = new GraphQLInputObjectType({
  name: 'MatchInput',
  fields: () => ({
    round: {
      type: GraphQLInt
    },
    number: {
      type: GraphQLInt
    },
    PlayFormat: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString
    },
    teamformat: {
      type: GraphQLBoolean
    },
    person: {
      type: GraphQLString
    },
    opponent: {
      type: GraphQLString
    },
    win: {
      type: GraphQLInt
    },
    loss: {
      type: GraphQLInt
    },
    draw: {
      type: GraphQLInt
    },
    outcome: {
      type: GraphQLInt
    },
    winbydrop: {
      type: GraphQLBoolean
    }
  })
})

export default MatchInputType;
