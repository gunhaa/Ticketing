"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router = (0, express_1.Router)();
router.use((0, cookie_parser_1.default)());
router.get('/waiting', async (req, res, next) => {
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
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'waiting.html'));
});
// 이 방법 너무 허술한거 같은데 우선 진행
// websocket, event로 리팩토링 해야함
router.get('/waiting/api/v1', async (req, res, next) => {
    const userUuid = req.query.userUuid;
    if (!userUuid) {
        //너 무슨짓임 uuid 없으니 처음 페이지로 가셈 있는 쿠키있으면 다 놓고가셈
        res.clearCookie('queueLength');
        res.clearCookie('userUuid');
        return res.redirect('/');
    }
    // redis에서 받은 uuid의 위치를 검색, O(N)이지만 n번대 까지만 offset 검색하기에 오버헤드가 심하진 않을꺼임
    // 있다면, 제거하고 타겟페이지로 리다이렉트시킴, 입장 가능한 token(uuid)부여
    // 없다면, 새로운 queuelen(대기열 위치)를 알려주고 early return
});
exports.default = router;
