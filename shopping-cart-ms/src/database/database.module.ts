import { Module } from '@nestjs/common';
import { DatabaseProviders } from '../database/databaseProviders';

@Module({
    providers: [...DatabaseProviders],
    exports: [...DatabaseProviders],
})
export class DatabaseModule { }
