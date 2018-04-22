const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const graphqlHTTP = require('express-graphql');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config');

const routes = require('./routes/index');
const { connectDatabase } = require('./database/index');
const Users = require('./database/Users');
const { schema } = require('./graphql/index');

const PORT = process.env.PORT || 5000;
const APP_SECRET = process.env.BUDGET_BUILDER_APP_SECRET;
const DB_USER = process.env.BUDGET_BUILDER_DB_USER;
const DB_PASSWORD = process.env.BUDGET_BUILDER_DB_PASSWORD;
const DB_SERVER = process.env.BUDGET_BUILDER_DB_SERVER;

if (!DB_USER || !DB_PASSWORD || !DB_SERVER || !APP_SECRET) {
  throw new Error('Required database environment variables are not defined');
}

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const userIdOnSuccess = await Users.validatePassword(username, password, APP_SECRET);

    if (!userIdOnSuccess) {
      return done(null, false, 'Incorrect username or password');
    }

    const user = await Users.getUserById(userIdOnSuccess);
    return done(null, user);
  }),
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  Users.getUserById(id).then((user) => done(null, user));
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(APP_SECRET));
app.use(
  session({
    secret: APP_SECRET,
    cookie: { maxAge: 60000 },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  '/graphql',
  graphqlHTTP((request) => ({
    context: request.session,
    schema: schema,
    graphiql: true,
  })),
);

const distDirectory = path.join(__dirname, '../', '../', 'dist');
app
  .use('/dist', express.static(distDirectory))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.use(routes);

const compiler = webpack(webpackConfig);
app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }),
);

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, function(err, result) {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

connectDatabase(
  {
    username: DB_USER,
    password: DB_PASSWORD,
    databaseHost: DB_SERVER,
  },
  (err) => {
    if (err) {
      console.log('Error connecting database', err);
    } else {
      app.listen(PORT, () => {
        console.log(`Server started on ${PORT}`);
      });
    }
  },
);
