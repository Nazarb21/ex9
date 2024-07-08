import { ConnectionOptions } from 'typeorm';
import { Team } from './entities/team.entity';
import { Player } from './entities/player.entity';

const config: ConnectionOptions = {
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: false,
    entities: [Team, Player],
    cli: {
        entitiesDir: 'src/entities',
    },
};

export default config;
