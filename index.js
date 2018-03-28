const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const PORT = process.env.PORT || 5000;
const DB_USER = process.env.BUDGET_BUILDER_DB_USER;
const DB_PASSWORD = process.env.BUDGET_BUILDER_DB_PASSWORD;

if (!DB_USER || !DB_PASSWORD) {
  throw new Error('Database username or password environment variables are not defined');
}

const connectionString = `mongodb://${DB_USER}:${DB_PASSWORD}@ds125469.mlab.com:25469/budget-builder`;
MongoClient.connect(connectionString, (err, client) => {
  if (err) {
    console.log('Error connecting to database: ', err);
  }

  console.log('Connected to database');
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.send('def'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
