import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Request } from '../models/request';

import { BaseService, BASEURL } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LibroService extends BaseService {

  protected url = BASEURL + "libro";

  public getByTitulo(titulo: String): Observable<Request> {
    return this.http.get<Request>(this.url + this.toGETRequest(5, 1, ['id', 'titulo'], {'titulo': titulo})).pipe(
      map(data => data.data),
      catchError(this.handleError<Request>({data: null, status: 400}))
    );
  }

}
