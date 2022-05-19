import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, concat, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class UploadDemoInterceptor implements HttpInterceptor {
  values: number[][] = [];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url === '/upload-file') {

      this.generateValues();

      const events: Observable<HttpEvent<any>>[] = this.values[this.values.length - 1].map(x => of({
        type: HttpEventType.UploadProgress,
        loaded: x,
        total: 5512,
      } as HttpProgressEvent).pipe(delay(500)));

      const success: Observable<HttpResponse<any>> = of(new HttpResponse({ status: 200 })).pipe(delay(500));
      events.push(success);


      return concat(...events);
    }

    if (request.url.startsWith('/remove-file')) {
      const events: Observable<HttpEvent<any>>[] = [];

      const success: Observable<HttpResponse<any>> = of(new HttpResponse({ status: 200 })).pipe(delay(500));
      events.push(success);

      return concat(...events);
    }

    return next.handle(request);
  }

  /**
   * Generates semi-random values for the number of bytes currently uploaded.
   */
  generateValues(): void {
    const values: number[] = [];

    for (let i = 0; i < 8; i++) {
      if (i === 0) {
        values.push(0);
      } else {
        values.push(Math.min(5512, Math.max(i * (5512 / 8), (values[i - 1] + 1000 * Math.random()))));
      }
    }

    this.values.push(values);
  }
}
