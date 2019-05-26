import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Request } from '../models/request';
import { Usuario } from '../models/usuario';

import { BASEURL, BaseService, httpOptions } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  protected url = BASEURL + 'auth/';

  public login(usuario: Usuario): Observable<Request> {
    this.message.showLoader();
    return this.http.post<Request>(this.url + 'login', this.toPOSTRequest(usuario), httpOptions).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError<Request>({status: 400, data: null}))
    );
  }

  public logout(): Observable<Request> {
    return this.http.get<Request>(this.url + 'logout');
  }

  public getIDUsuario(): Observable<Request> {
    this.message.showLoader();
    return this.http.get<Request>(this.url + 'usuario').pipe(
      tap(_ => this.message.close(true))
    );
  }



}
