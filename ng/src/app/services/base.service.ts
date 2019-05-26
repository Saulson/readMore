import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Request } from '../models/request';
import { MessageService } from './message.service';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' })
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
      catchError(this.handleError('getNumRecord', {data: null, status: 400}))
    );
  }

  protected handleError<T>(operation = 'operation', result?: T) {
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
    }
  }

  protected toPOSTRequest(obj: any): String {
    var res = "";

    for(var key in obj){
      res += key + "=" + obj[key] + "&";
    }

    return res;
  }

  protected toGETRequest(limit: number, page: number, params?: any): String {
    var res = "?";
    var offset = (page - 1) * limit;

    res += "limit=" + limit + "&offset=" + offset + "&";

    for(var key in params) {
      res += key + "=" + params[key] + "&";
    }

     return res;
  }
}
