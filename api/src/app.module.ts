import { Module, HttpModule, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
// import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { ProjectsController } from './projects/projects.controller';
// import { ProjectsService } from './projects/projects.service';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { AuthMiddleware } from './middlewares/authMiddleware/auth.middleware';

@Module({
  imports: [ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(userContext: MiddlewareConsumer) {
    userContext
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'projects', method: RequestMethod.ALL },
      )
  }
}
