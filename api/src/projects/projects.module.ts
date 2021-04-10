import { Module, HttpModule } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [HttpModule],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule { }
