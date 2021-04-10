import { Injectable, HttpService } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';

@Injectable()
export class ProjectsService {
  constructor(private readonly httpService: HttpService) { }
  create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
  }

  findAll(): Observable<AxiosResponse<any>> {
    return this.httpService.get('http://localhost:3001')
      .pipe(
        map(response => response.data)
      );
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
