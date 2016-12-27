import { graphql } from 'graphql';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './src/schema';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if(err) console.error(err)
  else console.log('Mongodb connected')
})

let app = express();
const PORT = process.env.PORT || 8080;

app.use('/', cors(), graphQLHTTP( req => {

  let context = {};

  // TODO: create jwt secret move to env variable
  if (req.headers.authorization) {
    let decoded = jwt.decode(req.headers.authorization, process.env.JWT_SECRET)
    if(decoded) {
      context.viewer = decoded._doc
    } else {
      context.viewer = null
    }
  }

  return {
    context,
    schema: schema,
    pretty: true,
    graphiql: true
  }
}));

app.listen(8080, (err) => {
  console.log(`GraphQL Server is now running on ${PORT}`);
})
