const express = require('express');

// Complete your server here!
// Do NOT `server.listen()` inside this file!

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

const server = express();
server.use(express.json());

server.use('/api/actions',actionsRouter);
server.use('/api/projects',projectsRouter);

module.exports = server;
