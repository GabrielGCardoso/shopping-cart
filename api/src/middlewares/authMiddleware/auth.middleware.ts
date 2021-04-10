import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const token = req.headers['Authorization'] || 'tk not found';
    //here will be defined a rule to auth
    console.log(`token => ${token}`);
    req.headers['uid'] = 1;
    next();
  }
}
