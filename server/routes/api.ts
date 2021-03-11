import express, { Request, Response, Router } from "express";
import performanceTestControllers from "../controllers/performanceTestControllers";
import securityTestController from "../controllers/securityTestControllers";

const router = express.Router();

// receives API URL and query string from client
// calculate response time of query and returns the query result and respone time
router.post('/responsetime',
  // middleware to add to db
  // middleware to fetch from external api
  performanceTestControllers.responseTime,
  (req: Request, res: Response) => {
    console.log('inside api.ts');
    return res.status(200).json(res.locals)
  }
)


router.get('/dos', 
  securityTestController.dos, 
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.dos);
  }
)

// calculate num of completed requests in 1 sec
router.get('/load',
  performanceTestControllers.loadTesting,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.loadTestCounter)
  }
)

// calculate avg response time of 10 requests
router.get('/avgthroughput',
  performanceTestControllers.avgThroughput,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.loadTestCounter)
  }
)

export default router;
