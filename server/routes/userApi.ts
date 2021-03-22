import express, { Request, Response, Router } from "express";
import userControllers from "../controllers/userControllers";

const userRouter = express.Router();

// add new user to db and returns a successful message
userRouter.post('/register',
  userControllers.addUser, 
  (req: Request, res: Response) => {
    return res.status(200).send('User successfully added to db');
  }
)

// Validate user credentials
userRouter.post('/login', 
  userControllers.getUser,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.credentials);
  }
)

export default userRouter;
