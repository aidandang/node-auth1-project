const express = require('express');
const session = require('express-session');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

const server = express();

const sessionConfig = {
  name: 'monkey',
  secret: 'The sun is high, The sky is blue.',
  cookie: {
    maxAge: 1000*60*60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false
}

server.use(express.json());
server.use(session(sessionConfig))

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

module.exports = server;