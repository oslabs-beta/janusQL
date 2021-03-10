import express, { Request, Response, Router } from "express";
import performanceTestControllers from "../controllers/performanceTestControllers";
import securityTestController from "../controllers/securityTestControllers";

const router = express.Router();

// receives API URL and query string from client
// calculate response time of query and returns the query result and respone time
// expect from frontend: req.body.query, req.body.url
//router.get('/', 
// expect: req.body.query, req.body.url
router.post('/responsetime',
  // middleware to add to db
  // middleware to fetch from external api
  performanceTestControllers.responseTime,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals)
  }
)


router.get('/dos', 
  securityTestController.dos, 
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.dos);
  }
)



// TESTING PURPOSES, COMBINE MIDDLEWARE LATER
router.post('/load',
  performanceTestControllers.loadTesting,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.loadTestCounter)
  }
)

router.post('/avgthroughput',
  performanceTestControllers.avgThroughput,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.loadTestCounter)
  }
)

export default router;
