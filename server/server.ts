import express, { Request, Response } from "express";
import path from "path";
import morgan from "morgan";
import responseTime from "response-time";
// import expressGraphQL, { graphqlHTTP } from "express-graphql";
// import schema from "./schema";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serves static files in our client/assets folder
app.use(express.static('client'));

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.use(responseTime( (req: Request, res: Response, time: any) => {
  console.log(`${req.method} ${req.url} ${time}`);
}));

// app.use(responseTime());

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// NEED TO ASK FRONT END PPL
// expect: req.body.query, req.body.url
app.post('/input', 
  // middleware to add to db
  // middleware to fetch from external api

)



app.listen(PORT, () => { 
  console.log(`Listening on port ${PORT}...`);
});
