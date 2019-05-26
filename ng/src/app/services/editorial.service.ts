import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Request } from '../models/request';
import { Editorial } from '../models/editorial';

import { BASEURL, BaseService, httpOptions } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EditorialService extends BaseService {

  protected url = BASEURL + 'editorial';

  public getEditorial(limit: number, page: number): Observable<Request> {
    this.message.showLoader();

    return this.http.get<Request>(this.url + this.toGETRequest(limit, page)).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError('getEditorial', {data: null, status: 400}))
    );
  }

  public getEditorialByID(id: String): Observable<Request> {
    this.message.showLoader();

    return this.http.get<Request>(this.url + "?id=" + id).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError('getEditorialByID', {data: null, status: 400}))
    );
  }

  public createEditorial(editorial: Editorial): Observable<Request> {
    this.message.showLoader();

    return this.http.put<Request>(this.url, this.toPOSTRequest(editorial), httpOptions).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError('getEditorial', {data: null, status: 400}))
    );
  }

  public updateEditorial(editorial: Editorial): Observable<Request> {
    this.message.showLoader();

    return this.http.patch<Request>(this.url, this.toPOSTRequest(editorial), httpOptions).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError('getEditorial', {data: null, status: 400}))
    );
  }

  public deleteEditorial(id: String): Observable<Request> {
    this.message.showLoader();

    return this.http.delete<Request>(this.url + "?id=" + id).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError('getEditorial', {data: null, status: 400}))
    );
  }

}
