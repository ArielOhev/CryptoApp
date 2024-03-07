import express from 'express';
import usersRouter from './routers/users';
import guestsRouter from './routers/guests';
import githubRouter from './routers/github';
import path from 'path';
import  config from 'config';
import errorHandler from './middlewares/error/error-handler';
import session from 'express-session';
import auth from './middlewares/github-auth';

const server = express();
server.set('views',path.resolve(__dirname,'views'));
server.set('view engine','ejs');

server.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000 * 60 * 60 * 24 * 7,
    },
}));

server.use(auth.initialize());
server.use(auth.session());


server.use(express.urlencoded())
server.use('/',guestsRouter);
server.use('/users',usersRouter);
server.use('/github',githubRouter);



// server.use('/symbol/add',errorHandler);

const port=config.get<number>('app.port');
server.listen(port,()=>{
    console.log(`server listen on ${port}`);
})