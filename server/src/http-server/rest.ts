import express, { Request, Response } from 'express';

export const rest = express();
rest.get('/', (req: Request, res: Response) => res.send('Hello World!'));
