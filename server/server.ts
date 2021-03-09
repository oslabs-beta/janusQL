import express, {Request, Response} from 'express';
import path from 'path';

const PORT = 3000;
const app = express();

// parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serves static files in our client/assets folder
app.use(express.static('client'));

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// default error handler
app.use((err:any, req:any, res:any, next:any) => {
  const defaultError = {
    log: 'default error log',
    status: 400,
    message: { err: 'default error message' },
  };
  const errorObj = { ...defaultError, err} ;
  return res.status(errorObj.status).json(errorObj.message);
});
// broadcast on port 3000
app.listen(PORT, () => { 
  console.log(`Listening on port ${PORT}...`);
});
module.exports = app;
