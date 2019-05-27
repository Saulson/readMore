import { Injectable } from '@angular/core';

import { BASEURL, BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EditorialService extends BaseService {

  protected url = BASEURL + 'editorial';

}
