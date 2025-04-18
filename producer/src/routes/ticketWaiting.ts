import {Router, Request, Response, NextFunction} from 'express';
import path from 'path';
import redisClient from '../config/redis'
import { v4 as uuidv4 } from 'uuid';
import cookieParser from 'cookie-parser';

const router = Router();
router.use(cookieParser());

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