import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  constructor() {
    console.log('INTERCEPTOR CREADO');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('INTERCEPTOR EJECUTANDO');

    return next.handle().pipe(
      map((data) => {
        console.log('RESPUESTA ANTES:', data);

        return data;
      }),
    );
  }
}
