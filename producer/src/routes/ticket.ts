import {Router, Request, Response, NextFunction} from 'express';
import path from 'path';
import redisClient from '../config/redis'
import { v4 as uuidv4 } from 'uuid';


const router = Router();

const MAX_REQUEST_LIMIT  = 5; 
const QUEUE_KEY  = 'ticketQueue';
const ONE_HOUR = 1000*60*60;

const setCookie = (res:Response, userUuid: string) => {
    res.cookie('userUuid', userUuid, {
        httpOnly: true,
        maxAge: ONE_HOUR,
    })
};

router.get('/', async (req:Request, res:Response, next:NextFunction) => {
    
    try {

        const userUuid = uuidv4();
    
        await redisClient.rPush(QUEUE_KEY , userUuid);
    
        const listLength = await redisClient.lLen(QUEUE_KEY );
        if (listLength > MAX_REQUEST_LIMIT) {
            setCookie(res, userUuid);
            return res.redirect(`/ticket/waiting`);
        }
    
        await redisClient.lRem(QUEUE_KEY , 1, userUuid);
        res.sendFile(path.join(__dirname, '..', 'public', 'ticket.html'));
    
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;