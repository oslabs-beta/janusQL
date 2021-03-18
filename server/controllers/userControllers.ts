// import in db
import { Request, Response, NextFunction } from "express";
import db from '../models/userModel';

// create a controller obj
const userControllers = {
  // add user to db
  addUser: (req: Request, res: Response, next: NextFunction) => {
    
    // extract user info from req body
    const { username, fullname, password, email } = req.body;
    console.log('req body', req.body);

    // store username, password, fullname, email into an array for the db query later
    const params = [username, fullname, password, email];
    console.log('params', params);

    // SCRUB USER INPUTS

    // ensure inputs are valid
    if (!username || !fullname || !password || !email) {
      console.log('missing items err');
      return next({
        log: 'Missing username, fullname, password, and/or email in the userControllers.addUser middleware',
        message: {
          err: 'userController.addUser: ERROR: Check server logs for details'
        }
      });
    }

    // create a SQL query string
    const queryString = 'INSERT INTO users_table (username, fullname, "password", email) VALUES ($1, $2, $3, $4)';

    db.query(queryString, params)
      .then((data) => {
        console.log(data);
        return next();
      })
      .catch((err) => {
        console.log(err)
        return next({
          log: 'error inserting username, fullname, password, email',
          message: {
            err: 'userController.createUser: ERROR: Check server logs for details'
          }
        });
      });
  },

  getUser: (req: Request, res: Response, next: NextFunction) => {
    //query DB for credentials passed on request object
    const { username, password } = req.body;
    const params = [username, password];
    const queryString = `SELECT username, password FROM users_table WHERE username= $1 and password= $2`;
    
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
