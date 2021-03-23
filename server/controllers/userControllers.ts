import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import db from '../models/userModel';

const userControllers = {
  // add user to db
  addUser: async (req: Request, res: Response, next: NextFunction) => {
    
    // extract user info from req body
    const { username, fullname, password, email } = req.body;

    //bcrypt here 
    const hashPassword = await bcrypt.hash(password, 10);

    // store required fields into an array for the db query later
    const params = [username, fullname, hashPassword, email];

    // ensure all required fields exist
    if (!username || !fullname || !password || !email) {
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
        return next();
      })
      .catch((err) => {
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

    const params = [username];
    const queryString = `SELECT username, password FROM users_table WHERE username= $1`;
    
    db.query(queryString, params)
      .then(async data => {
        const rowsObj: any = data.rows[0];
        const userPW: string = rowsObj.password; 

        const comparePassword = await bcrypt.compare(password, userPW);
        
        if (comparePassword !== true){
          return next({
            log: 'error authenticating password',
            message: {
              err: 'userController.getUser: ERROR: Check server logs for details'
            }
          });
        }
        
        res.locals.credentials = comparePassword;
        return next();
      })
      .catch(err => {
        return next({
          log: 'Express error handler caught getUser middleware error',
          message: {
            err: 'userController.getUser: ERROR: Check server logs for details'
          }
        })
      })
  }
}  

export default userControllers;
