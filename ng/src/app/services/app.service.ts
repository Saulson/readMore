import { Injectable } from '@angular/core';

import { Observable} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Request } from '../models/request';

import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AppService extends BaseService {

  protected url = 'api/tool/';

  getName(): Observable<Request> {
    this.message.showLoader();
    return this.http.get<Request>(this.url + 'nombre')
    .pipe(
        tap(_ => {
          this.message.close(true);
        }),
        catchError(this.handleError<Request>('getName', {status: 400, data: null}))
      );
  }

}
