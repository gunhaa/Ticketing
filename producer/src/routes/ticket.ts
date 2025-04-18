import {Router, Request, Response, NextFunction} from 'express';
import path from 'path';
import redisClient from '../config/redis'
import { v4 as uuidv4 } from 'uuid';


const router = Router();

// const MAX_REQUEST_LIMIT = 100; 
const MAX_REQUEST_LIMIT_TEST = 3;
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
    
        const listLength = await redisClient.lLen(QUEUE_KEY);
        if (listLength > MAX_REQUEST_LIMIT_TEST) {
            const userUuid = uuidv4();
            await redisClient.rPush(QUEUE_KEY, userUuid);

            setCookie(res, userUuid);
            return res.redirect(`/ticket/waiting`);
        }
    

        res.sendFile(path.join(__dirname, '..', 'public', 'ticket.html'));
    
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/waiting', async (req:Request, res:Response, next:NextFunction) => {
    const userUuid = req.cookies['userUuid'];
    console.log(`get uuid : ${userUuid}`);

    if (!userUuid) {
        const referer = req.get('Referer') || '/';
        res.send(`
            <script>
                alert('쿠키가 없습니다.');
                window.location.href = '${referer}';
            </script>
        `);
        return;
    }

    // 제거 로직은 /ticket/waiting에서 진행
    // await redisClient.lRem(QUEUE_KEY , 1, userUuid);
    // polling 방식으로 js와 통신하며 자신의 상태를 반환한다, 그리고 uuid를 확인해서 존재한다면 해당 uuid를 지우고 ticket.html로 입장시킨다
    res.sendFile(path.join(__dirname, '..', 'public', 'waiting.html'));
});

export default router;