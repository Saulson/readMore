import { Injectable } from '@angular/core';

import { BASEURL, BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ColoniaService extends BaseService {

  protected url = BASEURL + 'colonia';
  
}
