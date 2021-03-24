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
  performanceTestControllers.bytes,
  performanceTestControllers.throughput,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals)
  }
)

router.get('/dos', 
  securityTestController.dos, 
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.dos);
  }
);

// calculate avg response time of 50 requests
router.post('/load',
  performanceTestControllers.loadTesting,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals)
  }
);

// endpoint to display history of response data
router.post('/history', 
  // controller to get metric history and return to client
  // <insert middleware>
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals)
  }
)

export default router;
