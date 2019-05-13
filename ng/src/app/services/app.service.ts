import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Request } from '../models/request';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = 'api/tool/';

  constructor(
    private http: HttpClient,
    private message: MessageService) { }

  getName(): Observable<Request> {
    this.message.showLoader();
    return this.http.get<Request>(this.url + 'nombre')
    .pipe(
        tap(_ => {
          this.message.close();
        }),
        catchError(this.handleError<Request>('getName', {status: 400, data: null}))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.message.close();
      this.message.showMessage('Error', error.error.error);

      return of(result as T);
    }
  }
}
