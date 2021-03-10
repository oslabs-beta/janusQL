import express, { Request, Response, Router } from "express";
import performanceTestControllers from "../controllers/performanceTestControllers";

const router = express.Router();

router.post('/login', (req, res) => {
    return res.status(200).json()
  })

export default router;
