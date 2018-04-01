const express = require('express');
const path = require('path');
const graphqlHTTP = require('express-graphql');

const { connectDatabase } = require('./database');
const { schema } = require('./graphql');

const PORT = process.env.PORT || 5000;
const DB_USER = process.env.BUDGET_BUILDER_DB_USER;
const DB_PASSWORD = process.env.BUDGET_BUILDER_DB_PASSWORD;
const DB_SERVER = process.env.BUDGET_BUILDER_DB_SERVER;

if (!DB_USER || !DB_PASSWORD || !DB_SERVER) {
  throw new Error('Required database environment variables are not defined');
}

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');


connectDatabase({
  username: DB_USER,
  password: DB_PASSWORD,
  databaseHost: DB_SERVER,
}, (err) => {
  if (err) {
    console.log('Error connecting database', err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  }
});
