// check-cookie-exists.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CheckCookieExistsInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    console.log('cookie from interceptor', request.cookies);
    const access_token = request.cookies.ACCESS_TOKEN;
    if (!access_token) {
      throw new UnauthorizedException('Session expired! Please signin again.');
    }

    return next.handle().pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }
}
