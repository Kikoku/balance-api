import { graphql } from 'graphql';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './src/schema';
import mongoose from 'mongoose';
import cors from 'cors'

mongoose.connect('mongodb://localhost/balance-api', (err) => {
  if(err) console.error(err)
  else console.log('Mongodb connected')
})

let app = express();
const PORT = process.env.PORT || 8080;

app.use('/', cors(), graphQLHTTP( req => {

  // TODO: Pull viewer information from auth_token
  const viewer = {id: ""};

  return {
    context: {
      viewer
    },
    schema: schema,
    pretty: true,
    graphiql: true
  }
}));

app.listen(8080, (err) => {
  console.log(`GraphQL Server is now running on ${PORT}`);
})
