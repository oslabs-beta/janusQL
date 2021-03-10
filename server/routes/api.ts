import express, { Request, Response, Router } from "express";
import performanceTestControllers from "../controllers/performanceTestControllers";
import securityTestController from "../controllers/securityTestControllers";

const router = express.Router();

// receives API URL and query string from client
// calculate response time of query and returns the query result and respone time
// expect from frontend: req.body.query, req.body.url
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

export default router;
