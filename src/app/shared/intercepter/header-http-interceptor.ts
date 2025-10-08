import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/environment';
import {Observable, pipe, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';



@Injectable()
export class HeaderHttpInterceptor implements HttpInterceptor {

  constructor( private router: Router,
               private activatedRoute: ActivatedRoute,
              ) {
  }

  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    const URL_PATH = environment.contextPath;
    let url;

    const interceptedUrl = this.getIntercepted(request.url);
    switch (interceptedUrl) {
      case 'http':
        url = request.url; break;
      case 'i18':
        url = request.url; break;
      case './assets':
        url = request.url;
        break;
      default:
        url = URL_PATH + request.url ;
    }

    const customRequest = request.clone( {
      headers: request.headers,
      reportProgress: request.reportProgress,
      params: request.params,
      responseType: request.responseType,
      withCredentials: true,
      body: request.body,
      method: request.method,
      url
    } );

    return  next.handle( customRequest ).pipe(
      map((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {

        if ( (error.url == null || error.url.includes( '/login' ))  ) {
          localStorage.removeItem( 'IsLoggedIn' );
          // not logged in so redirect to login page with the return url and return false
          this.router.navigate(['login']);
        }
        return throwError(error);
      }));
  }

  getIntercepted(url: string): string {
    if ( url.startsWith( 'http' ) ) {
      return 'http';
    }
    if ( url.startsWith( './assets' ) ) {
      return './assets';
    }
    if ( url.includes( 'i18' ) ) {
      return 'i18';
    }
    return 'default';
  }


}
