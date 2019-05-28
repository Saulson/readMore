import { Injectable } from '@angular/core';

import { BaseService, BASEURL } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService extends BaseService {

  protected url = BASEURL + "prestamo";

}
