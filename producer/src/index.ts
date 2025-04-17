import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/ticket', (req:Request, res:Response, next:NextFunction) => {
  res.sendFile(path.join(__dirname, 'public', 'ticket.html'));
});

app.listen(port, () => {
  console.log("listen 실행..");
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});