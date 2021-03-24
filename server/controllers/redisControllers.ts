import { Request, Response, NextFunction } from "express";
import redis from 'redis';

const client = redis.createClient(6379);

const redisControllers = {
  getHistory: (req: Request, res: Response, next: NextFunction) => {
    // create a key using the request url and query
    
    
    // check if url and query exists in cache
    
    // if request exists in cache, parse the value into a JS obj and store in locals obj
    
    // return next

    
  },

  cacheResponseTime: (req: Request, res: Response: next: NextFunction) => {
    // get response time from res.locals

    // get url and query from request
    // make key from url and query

    // check if key exists in cache
      // if yes, push curr response time to key
  }
}

export default redisControllers;