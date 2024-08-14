import express from 'express';
import morgan from 'morgan';
import router from './router';

const server = express();

server.use(express.json())
server.use(morgan('dev'));
server.use('/api', router);

export default server;