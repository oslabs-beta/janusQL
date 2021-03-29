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
  performanceTestControllers.throughput,
  performanceTestControllers.bytes,
  // cache response time and throughput
  performanceTestControllers.cacheMetrics,
  // send response to client
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals)
  }
)

router.get('/fastdos', 
  securityTestController.fastDos, 
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.dos);
  }
)

router.post('/brutedos', 
  securityTestController.brutedos, 
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.testResult);
  }
)

// calculate transfer size
router.post('/bytes',
  performanceTestControllers.bytes,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals);
  }
)

// calculate num of completed requests in 1 sec
router.post('/throughput',
  performanceTestControllers.throughput,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals);
  }
)

// calculate avg response time of 50 requests
router.post('/load',
  performanceTestControllers.loadTesting,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals)
  }
)

export default router;
