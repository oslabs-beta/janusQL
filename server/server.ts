import express, { Request, Response } from "express";
import path from "path";
import responseTime from "response-time";
import apiRouter from './routes/api';
// import schema from "./schema";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serves static files in our client/assets folder
app.use(express.static('client'));

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// route handler
app.use('/input', apiRouter);

// this is using responseTime module to test our OWN server, not the actual test
app.use(responseTime( (req: Request, res: Response, time: any) => {
  console.log(`${req.method} ${req.url} ${time}`);
}));


app.listen(PORT, () => { 
  console.log(`Listening on port ${PORT}...`);
});
