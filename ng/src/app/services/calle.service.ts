import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Request } from '../models/request';
import { Calle } from '../models/calle';

import { BASEURL, BaseService, httpOptions } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CalleService extends BaseService {

  protected url = BASEURL + 'calle';
  
}
