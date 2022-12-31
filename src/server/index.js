const express = require('express');
const userStudents = require('../routes/students');


const server = express();
server.use(express.json());

server.use('/students', userStudents);

module.exports = server;