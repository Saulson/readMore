import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {Request } from '../models/request';
import { BaseService, BASEURL } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService extends BaseService {

  protected url = BASEURL + "configuracion"

  public getConf(): Observable<Request> {
    this.message.showLoader();

    return this.http.get<Request>(this.url + this.toGETRequest(1, 1, 
        ['nombre', 'logo', 'max_prestamos', 'tiempo_prestamos'])).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError<Request>({data: null, status: 400}))
    );
  }
}
