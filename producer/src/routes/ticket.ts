import {Router, Request, Response, NextFunction} from 'express';
import path from 'path';
import redisClient from '../config/redis'

const router = Router();

router.get('/', (req:Request, res:Response, next:NextFunction) => {
    res.sendFile(path.join(__dirname, '..' ,'public', 'ticket.html'));
});

router.get('/v1/redis', (req:Request, res:Response, next:NextFunction)  => {
    
});

export default router;