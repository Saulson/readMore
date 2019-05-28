import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Request } from '../models/request';

import { Usuario } from '../models/usuario';
import { BaseService, BASEURL, httpOptions } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService {

  protected url = BASEURL + "usuario";

  public getUsuarioByID(id: String): Observable<Request> {
    this.message.showLoader();

    return this.http.get<Request>(this.url + this.toGETRequest(1, 1, 
        ['id', 'id_persona', 'id_grupo_permiso'] + "&id=" + id)).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError<Request>({data: null, status: 400}))
    );
  }

  public cambiarPass(usuario: Usuario): Observable<Request> {
    this.message.showLoader() ;

    return this.http.patch<Request>(this.url + "/changepass", this.toPOSTRequest(usuario), httpOptions).pipe(
      tap(_ => this.message.close(true)),
      catchError(this.handleError<Request>({data: null, status: 400}))
    );
  }

}
