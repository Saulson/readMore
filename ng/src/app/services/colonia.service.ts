import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Request } from '../models/request';
import { Colonia } from '../models/colonia';

import { BASEURL, BaseService, httpOptions } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ColoniaService extends BaseService {

  protected url = BASEURL + 'colonia';
  
}
