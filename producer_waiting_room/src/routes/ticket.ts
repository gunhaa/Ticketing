import {Router, Request, Response, NextFunction} from 'express';
import path from 'path';
import redisClient from '../config/redis'
import { v4 as uuidv4 } from 'uuid';
import cookieParser from 'cookie-parser';
import { MAX_REQUEST_LIMIT, MAX_REQUEST_LIMIT_TEST, QUEUE_KEY, ONE_HOUR, RPUSH_KEY_AND_GET_QUEUE_LEN } from '../constants/constants';


const router = Router();
router.use(cookieParser());

const setCookie = (res:Response, userUuid: string, queueLength:number) => {
    res.cookie('userUuid', userUuid, {
        httpOnly: true,
        maxAge: ONE_HOUR,
    });

    res.cookie('queueLength', queueLength, {
        httpOnly: true,
        maxAge: ONE_HOUR,
    });
}

router.get('/', async (req:Request, res:Response, next:NextFunction) => {
    
    try {
    
        const queueLength = await redisClient.lLen(QUEUE_KEY);
        if (queueLength > MAX_REQUEST_LIMIT_TEST) {

            const userUuid = uuidv4();
            await redisClient.rPush(QUEUE_KEY, userUuid);

            // const [shouldProceed, queueLen] : [boolean, number] = await redisClient.eval(
            //     RPUSH_KEY_AND_GET_QUEUE_LEN,
            //     {
            //         keys: [QUEUE_KEY],
            //         arguments: [MAX_REQUEST_LIMIT_TEST.toString(), userUuid]
            //     }
            // ) as [boolean, number];
            
            setCookie(res, userUuid, queueLength);
            return res.redirect(`/ticket/waiting`);
        }
    

        res.sendFile(path.join(__dirname, '..', 'public', 'ticket.html'));
    
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
})


export default router;