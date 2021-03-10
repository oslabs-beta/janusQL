import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";

const loginControllers = {
  login: (req: Request, res: Response, next: NextFunction) => {
    //access credentials on req.body
    //ask DB if those credentials are stored
    //pass response from DB back to client
  },
}
export default performanceTestControllers;