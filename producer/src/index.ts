import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('첫 번째 미들웨어');
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('현재 시간:', new Date().toISOString());
  next(); 
});

app.listen(port, () => {
  console.log("listen 실행..");
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});