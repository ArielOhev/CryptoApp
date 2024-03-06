import express from 'express';
import usersRouter from './routers/users';
import path from 'path';
import  config from 'config';
import errorHandler from './middlewares/error/error-handler';

const server = express();
server.set('views',path.resolve(__dirname,'views'));
server.set('view engine','ejs');

server.use(express.urlencoded())
server.use('/users',usersRouter);

// server.use('/symbol/add',errorHandler);

const port=config.get<number>('app.port');
server.listen(port,()=>{
    console.log(`server listen on ${port}`);
})