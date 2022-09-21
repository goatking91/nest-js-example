import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: Logger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const { method, url, body } = context.getArgByIndex(0);
    this.logger.log(`Request to ${method} ${url}`);

    return next
      .handle()
      .pipe(
        tap((data) =>
          this.logger.log(
            `Response from ${method} ${url} \n response: ${JSON.stringify(
              data,
            )}`,
          ),
        ),
      );
  }
}
