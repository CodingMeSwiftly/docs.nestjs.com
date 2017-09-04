import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BasePageComponent } from '../page/page.component';

@Component({
  selector: 'app-interceptors',
  templateUrl: './interceptors.component.html',
  styleUrls: ['./interceptors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterceptorsComponent extends BasePageComponent {
  get loggingInterceptor() {
    return `
import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Interceptor()
export class LoggingInterceptor implements NestInterceptor {
  intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    console.log('Before...');
    const now = Date.now();

    return stream$.do(
      () => console.log(\`After... \${Date.now() - now}ms\`),
    );
  }
}`;
  }

  get useLoggingInterceptor() {
    return `
@UseInterceptors(LoggingInterceptor)
export class CatsController {}`;
  }

  get consoleOutput() {
    return `
Before...
After... 1ms`;
  }

  get transformInterceptor() {
    return `
import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Interceptor()
export class TransformInterceptor implements NestInterceptor {
  intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    return stream$.map((data) => ({ data }));
  }
}`;
  }

  get dataResponse() {
    return `
{
    "data": []
}`;
  }

  get cacheInterceptor() {
    return `
import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Interceptor()
export class CacheInterceptor implements NestInterceptor {
  intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    const isCached = true;
    if (isCached) {
      return Observable.of([]);
    }
    return stream$;
  } 
}`;
  }
}