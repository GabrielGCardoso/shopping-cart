import { createConnection } from 'typeorm';
import Config from '../config/config';
const config = Config();

export const DatabaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: 'mysql',
            host: config.database.host,
            port: config.database.port,
            username: 'root',
            password: 'server',
            database: 'test',
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ],
            synchronize: true,
        }),
    },
];