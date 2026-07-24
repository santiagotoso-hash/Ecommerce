import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('INTERCEPTOR FUNCIONANDO');

    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map(({ password, ...user }) => user);
        }

        if (data?.password) {
          const { password, ...user } = data;
          return user;
        }

        return data;
      }),
    );
  }
}
