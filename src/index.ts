import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import config from './ormconfig';
import { teamController } from './controllers/team.controller';
import { playerController } from './controllers/player.controller';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();
app.use(express.json());

app.use('/teams', teamController);
app.use('/players', playerController);

app.use(errorMiddleware);

createConnection(config)
    .then(() => {
        app.listen(3000, () => {
            console.log('Server started on http://localhost:3000');
        });
    })
    .catch(error => console.log(error));
