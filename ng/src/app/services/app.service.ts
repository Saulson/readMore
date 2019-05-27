import { Injectable } from '@angular/core';

import { Observable} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Request } from '../models/request';

import { BaseService, BASEURL } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AppService extends BaseService {

  protected url = BASEURL + 'tool/';

  public getName(): Observable<Request> {
    this.message.showLoader();
    return this.http.get<Request>(this.url + 'nombre')
    .pipe(
        tap(_ => this.message.close(true)),
        catchError(this.handleError<Request>({status: 400, data: null}))
      );
  }

  public getMenu(id_usuario: Number): Observable<Request> {
    this.message.showLoader();
    return this.http.get<Request>(this.url + 'menu?id=' + id_usuario).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError<Request>({status: 400, data: null}))
    );
  }

  public getTables(): Observable<Request> {
    this.message.showLoader();
    return this.http.get<Request>(this.url + "tables").pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError<Request>({status: 400, data: null}))
    );
  }

}
