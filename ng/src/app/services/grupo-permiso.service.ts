import { Injectable } from '@angular/core';

import { BASEURL, BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoPermisoService extends BaseService {

  protected url = BASEURL + 'grupo permiso';

}
