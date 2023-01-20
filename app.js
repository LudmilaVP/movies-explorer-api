const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
const DATABASE_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');
const {
  signinValidator,
  signupValidator,
} = require('./middlewares/validators');
const { createUser, login, signout } = require('./controllers/users');

app.use(express.json());
app.use(requestLogger);
app.get('/signout', signout);
app.post('/signin', signinValidator, login);
app.post('/signup', signupValidator, createUser);

app.use(auth);
app.use(routes);
app.use(errorLogger);

app.use(errors());
app.use(handleError);

mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
