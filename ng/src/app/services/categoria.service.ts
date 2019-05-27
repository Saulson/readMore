import { Injectable } from '@angular/core';

import { BaseService, BASEURL } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService {

    protected url = BASEURL + "categoria";

}
