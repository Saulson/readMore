import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Request } from '../models/request';
import { MessageService } from './message.service';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })

};

export const BASEURL = 'api/';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected url = '';

  constructor(
    protected http: HttpClient,
    protected message: MessageService,
    private location: Location) { }

  public getNumRecord() {
    this.message.showLoader();

    return this.http.get<Request>(this.url + "/num").pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError<Request>({data: null, status: 400}))
    );
  }

  public get(limit: number, page: number, fields?: any): Observable<Request> {
    this.message.showLoader();

    return this.http.get<Request>(this.url + this.toGETRequest(limit, page, fields)).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError<Request>({data: null, status: 400}))
    );
  }

  public getByID(id: String): Observable<Request> {
    this.message.showLoader();

    return this.http.get<Request>(this.url + "?id=" + id).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError<Request>({data: null, status: 400}))
    );
  }

  public create(calle: any): Observable<Request> {
    this.message.showLoader();

    return this.http.put<Request>(this.url, this.toPOSTRequest(calle), httpOptions).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError<Request>({data: null, status: 400}))
    );
  }

  public update(calle: any): Observable<Request> {
    this.message.showLoader();

    return this.http.patch<Request>(this.url, this.toPOSTRequest(calle), httpOptions).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError<Request>({data: null, status: 400}))
    );
  }

  public delete(id: String): Observable<Request> {
    this.message.showLoader();

    return this.http.delete<Request>(this.url + "?id=" + id).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError<Request>({data: null, status: 400}))
    );
  }

  protected handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.message.close(true);
      if(error.status == 500) {
        this.message.showMessage('Error', 'Internal API Server Error');
      }
      else if(error.status == 401) {
        this.message.showMessage('Error', 'Operacion no autorizada', 
          true).subscribe(_ => {
            this.location.go("/");
            window.location.reload();
        });
      }
      else {
        this.message.showMessage('Error', error.error.error);
      }

      return of(result as T);
    };
  }

  protected toPOSTRequest(obj: any): String {
    var res = "";

    for(var key in obj){
      res += key + "=" + obj[key] + "&";
    }

    return res;
  }

  protected toGETRequest(limit: number, page: number, fields: any, params?: any): String {
    var res = "?";
    var offset = (page - 1) * limit;

    res += "limit=" + limit + "&offset=" + offset + "&";

    for(var key in params) {
      res += key + "=" + params[key] + "&";
    }

    if(fields != undefined) {
      res += "fields=" + fields
    }

    return res;
  }
}
