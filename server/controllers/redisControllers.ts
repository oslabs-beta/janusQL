import { Request, Response, NextFunction } from "express";
import redis from 'redis';

const client = redis.createClient(6379);

const redisControllers = {
  getHistory: (req: Request, res: Response, next: NextFunction) => {
    // create a key using the request url and query
    
    
    // check if url and query exists in cache
    
    // if request exists in cache, parse the value into a JS obj and store in locals obj
    
    // return next

    
  }
}

export default redisControllers;