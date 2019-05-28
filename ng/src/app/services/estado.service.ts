import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Request } from '../models/request';

import { BaseService, BASEURL } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoService extends BaseService {

  protected url = BASEURL + "estado";

  public getByDescripcion(descripcion: String): Observable<Request> {
    return this.http.get<Request>(this.url + this.toGETRequest(5, 1, ['id', 'descripcion'], {'descripcion': descripcion})).pipe(
      map(data => data.data),
      catchError(this.handleError<Request>({data: null, status: 400}))
    );
  }

}
