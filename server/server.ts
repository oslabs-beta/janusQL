import express from "express";
import path from "path";
import expressGraphQL, { graphqlHTTP } from "express-graphql";
import schema from "./schema";

const PORT = 3000;
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
  // look up node fetch
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serves static files in our client/assets folder
app.use(express.static('client'));

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

app.listen(PORT, () => { 
  console.log(`Listening on port ${PORT}...`);
});
