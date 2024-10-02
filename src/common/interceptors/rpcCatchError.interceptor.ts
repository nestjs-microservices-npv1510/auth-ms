import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { error } from 'console';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RpcCatchErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger('RpcCatchErrorInterceptor');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        // console.log('ERROR FROM INTERCEPTOR');
        // console.log(err.stack);
        this.logger.error(JSON.stringify(err));
        this.logger.error(JSON.stringify(err.message));

        // Nếu err đã là Rpc Exception => chỉ gửi
        if (err instanceof RpcException) throw err;

        // console.log(err.name);

        if (
          err.name === 'JsonWebTokenError' ||
          err.name === 'TokenExpiredError'
        )
          throw new RpcException({
            statusCode: HttpStatus.UNAUTHORIZED,
            ...err,
          });

        // Nếu err không phải RpcExeption chuyển thành RpcException và gửi
        throw new RpcException({ ...err });
      }),
    );
  }
}
