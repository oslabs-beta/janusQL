import express, { Request, Response, Router } from "express";
import performanceTestControllers from "../controllers/performanceTestControllers";
import securityTestController from "../controllers/securityTestControllers";

const router = express.Router();

// expect: req.body.query, req.body.url
router.get('/perf', 
  // middleware to add to db
  // middleware to fetch from external api
  performanceTestControllers.responseTime,
  (req, res) => {
    // tell frontend the data from query is stored in responseTimeData, response time is stored in responseTime
    return res.status(200).json(res.locals)
  }
)

router.get('/dos', 
securityTestController.dos, 
(req, res) => {
  return res.status(200).json(res.locals.dos);
})

export default router;
