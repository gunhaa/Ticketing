import express, { Express } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import ticketRouter from './routes/ticket';
import ticketWaitingRouter from './routes/ticketWaiting';


dotenv.config();

const app: Express = express();

const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/ticket', ticketRouter);
app.use('/ticket', ticketWaitingRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});