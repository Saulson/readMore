import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Request } from '../models/request';
import { Login } from '../models/login';

import { BaseService, httpOptions } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  protected url = 'api/auth/login';

  login(login: Login): Observable<Request> {
    this.message.showLoader();
    return this.http.post<Request>(this.url, this.toPOSTRequest(login), httpOptions).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError<Request>('login', {status: 400, data: null}))
    );
  }

}
