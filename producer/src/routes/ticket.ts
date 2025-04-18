import {Router, Request, Response, NextFunction} from 'express';
import path from 'path';
import redisClient from '../config/redis'
import { v4 as uuidv4 } from 'uuid';


const router = Router();

const maxRequestLimit = 5; 
const queueKey = 'ticketQueue';

router.get('/', async (req:Request, res:Response, next:NextFunction) => {
    
    try {
        const userUuid = uuidv4();
        console.log(`this uuid ${userUuid}`);
    
        await redisClient.rPush(queueKey, userUuid);

        res.cookie('userUuid', userUuid, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60, 
        });
    
        const listLength = await redisClient.lLen(queueKey);
        if (listLength > maxRequestLimit) {
            return res.redirect(`/ticket/waiting`);
        }
    
        res.sendFile(path.join(__dirname, '..', 'public', 'ticket.html'));
    
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;