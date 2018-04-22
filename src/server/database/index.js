const MongoClient = require('mongodb').MongoClient;

const DATABASE_NAME = 'budget-builder';

const state = {
  database: null,
};

exports.connectDatabase = ({ username, password, databaseHost }, done) => {
  const connectionString = `mongodb://${username}:${password}@${databaseHost}/${DATABASE_NAME}`;

  if (state.database) {
    return done();
  }

  const connectionOptions = {
    auth: {
      user: username,
      password: password,
    },
  };
  MongoClient.connect(connectionString, connectionOptions, (err, client) => {
    if (err) {
      return done(err);
    } else {
      state.database = client.db(DATABASE_NAME);
      done();
    }
  });
};

exports.getDatabase = () => state.database;

exports.closeDatabase = (done) => {
  if (state.database) {
    state.database.closeDatabase((err) => {
      if (err) {
        done(err);
      }

      state.database = null;
      state.mode = null;
      done();
    });
  }
};
