import { Pool } from 'pg';
const PG_URI = 'postgres://upnxmkex:QDJJzDJkUdtX7D3KCzsvZXMPUXPPlLKd@ziggy.db.elephantsql.com:5432/upnxmkex';

const pool = new Pool({
  connectionString: PG_URI
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
export default {
  query: (text: any, params: any) => {
    return pool.query(text, params)
  }
}