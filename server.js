const express = require('express');
const server = express();

const userRouter = require('./routes/userRoutes');

server.use(express.json());

server.use('/api/users', userRouter);

module.exports = server;