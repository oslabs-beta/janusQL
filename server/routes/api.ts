import express, { Request, Response, Router } from "express";
import performanceTestControllers from "../controllers/performanceTestControllers";
import securityTestController from "../controllers/securityTestControllers";
import userController from "../controllers/userControllers";

const router = express.Router();

// receives API URL and query string from client
// calculate response time of query and returns the query result and respone time
// expect: req.body.query, req.body.url
router.get('/', 
  // middleware to add to db
  // middleware to fetch from external api
  performanceTestControllers.responseTime,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.responseTime)
  }
)

router.get('/dos', 
  securityTestController.dos, 
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.dos);
  }
)

// add new user to db and returns a successful message
router.post('/',
  userControllers.addUser, 
  (req: Request, res: Response) => {
    return res.status(200).send('user successfully added to db');
  }
)

export default router;
