import { Injectable } from '@angular/core';

import { BaseService, BASEURL} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EjemplarService extends BaseService {

  protected url = BASEURL + 'ejemplar';

}
