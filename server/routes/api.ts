import express, { Request, Response, Router } from "express";
import performanceTestControllers from "../controllers/performanceTestControllers";
import securityTestController from "../controllers/securityTestControllers";

const router = express.Router();

// expect: req.body.query, req.body.url
router.get('/', 
  // middleware to add to db
  // middleware to fetch from external api
  performanceTestControllers.responseTime,
  (req, res) => {
    return res.status(200).json(res.locals.responseTime)
  }
)

router.get('/dos', 
securityTestController.dos, 
(req, res) => {
  return res.status(200).json(res.locals.dos);
})

export default router;
