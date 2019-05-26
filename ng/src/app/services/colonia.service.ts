import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Request } from '../models/request';
import { Colonia } from '../models/colonia';

import { BASEURL, BaseService, httpOptions } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ColoniaService extends BaseService {

  protected url = BASEURL + 'colonia';

  public getColonia(limit: number, page: number): Observable<Request> {
    this.message.showLoader();

    return this.http.get<Request>(this.url + this.toGETRequest(limit, page)).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError('getEditorial', {data: null, status: 400}))
    );
  }

  public getColoniaByID(id: String): Observable<Request> {
    this.message.showLoader();

    return this.http.get<Request>(this.url + "?id=" + id).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError('getEditorialByID', {data: null, status: 400}))
    );
  }

  public createColonia(colonia: Colonia): Observable<Request> {
    this.message.showLoader();

    return this.http.put<Request>(this.url, this.toPOSTRequest(colonia), httpOptions).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError('getEditorial', {data: null, status: 400}))
    );
  }

  public updateColonia(colonia: Colonia): Observable<Request> {
    this.message.showLoader();

    return this.http.patch<Request>(this.url, this.toPOSTRequest(colonia), httpOptions).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError('getEditorial', {data: null, status: 400}))
    );
  }

  public deleteColonia(id: String): Observable<Request> {
    this.message.showLoader();

    return this.http.delete<Request>(this.url + "?id=" + id).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError('getEditorial', {data: null, status: 400}))
    );
  }

}
