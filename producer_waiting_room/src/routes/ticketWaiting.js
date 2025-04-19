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
exports.default = router;
