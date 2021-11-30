const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const indexRoute = require('./routes/index');

// DotEnv
require('dotenv').config();

const main = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.set('view engine', 'ejs');
  app.use('/static', express.static('static'));

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));

  app.use(helmet());

  require('./routes/index')(app);

  app.listen(process.env.PORT, () => {
    console.log(`\u001b[1m\u001b[36;1mServer listening on \u001b[33;1mhttp://localhost:${process.env.PORT}\u001b[0m`);
    console.log(`\u001b[36;1mPassword: \u001b[33;1m${process.env.PW}`);
  });
}

main();