import express, { Request, Response, NextFunction, Errback } from "express";
import path from "path";
import apiRouter from './routes/api';
import userRouter from './routes/userApi';
import redis from 'redis';

const isTest = process.env.NODE_ENV === 'test';

const PORT = 3000;
const app = express();
const client = redis.createClient(6379);

client.on('error', (err) => console.log('redis err:', err));

client.set('testKey', 'testValue', redis.print);
client.get('testKey', redis.print);


// parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serves static files in our client/assets folder
app.use(express.static('client'));

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// route handler for external user's API queries
app.use('/input', apiRouter);

// route handler for queries related to user table in SQL db
app.use('/user', userRouter);

// default error handler
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  const defaultError = {
    log: 'default error log',
    status: 500,
    message: { err: 'default error message' },
  };
  const errorObj = Object.assign({}, defaultError, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// broadcast on port 3000
if(!isTest){
  app.listen(PORT, () => { 
    console.log(`Listening on port ${PORT}...`);
  });
}
else {
  console.log('Testing ....');
}

export default app;