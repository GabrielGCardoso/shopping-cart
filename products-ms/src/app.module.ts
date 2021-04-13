import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

import Config from './config/config';
const config = Config();
@Module({
  imports: [ProductsModule,
    MongooseModule.forRoot(`mongodb://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}`),
  ],
  providers: [AppService],
})
export class AppModule { }
