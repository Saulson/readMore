import { Injectable } from '@angular/core';

import { BASEURL, BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CalleService extends BaseService {

  protected url = BASEURL + 'calle';
  
}
