// import in db
import { Request, Response, NextFunction } from "express";
import db from '../models/userModel';

// create a controller obj
const userControllers = {
  // add user to db
  addUser: (req: Request, res: Response, next: NextFunction) => {
    
    // extract user info from req body
    const { username, fullname, password, email } = req.body;

    // store username, password, fullname, email into an array for the db query later
    const params = [username, fullname, password, email];

    // SCRUB USER INPUTS

    // ensure inputs are valid
    if (!username || !fullname || !password || !email){
      return next('Missing username, fullname, password, and/or email in the userControllers.addUser middleware');
    }
    // inputs exist, inputs are strings, inputs don't have script tags
    // trim the whitespace -> have questions LMAO

    // create a SQL query string
    const queryString = 'INSERT INTO users_table ( username, password, email, fullname ) VALUES ($1, $2, $3, $4)';
    
    db.query(queryString, params)
    .then(data => next())
    .catch(err => next(err))
      
  },

  getUser: (req: Request, res: Response, next: NextFunction) => {
    //query DB for credentials passed on request object
    const { username, password } = req.body;
    const params = [username, password];
    // const params: any = [];

    const queryString = `SELECT username, password FROM users_table WHERE username= $1 and password= $2`;
    // const queryString = `SELECT * FROM users_table`;
    
    db.query(queryString, params)
    .then(data =>{
      res.locals.credentials = data.rows;
      return next();
    })
    .catch(err => {
      console.log(err) 
      return next(err)
    })
  }
}

export default userControllers;
