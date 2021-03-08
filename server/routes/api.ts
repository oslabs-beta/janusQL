import express, { Request, Response, Router } from "express";
import performanceTestControllers from "../controllers/performanceTestControllers";

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

export default router;
