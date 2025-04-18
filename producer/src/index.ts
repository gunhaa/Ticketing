import express, { Express } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import ticketRouter from './routes/ticket';
import cookieParser from 'cookie-parser';


dotenv.config();

const app: Express = express();
app.use(cookieParser());

const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/ticket', ticketRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});