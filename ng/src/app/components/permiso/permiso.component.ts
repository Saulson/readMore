import { Component, OnInit } from '@angular/core';

import { Permiso } from '../../models/permiso';

import { MessageService } from '../../services/message.service';
import { PermisoService } from '../../services/permiso.service';

@Component({
  selector: 'permiso',
  templateUrl: './permiso.component.html',
  styleUrls: ['./permiso.component.scss']
})
export class PermisoComponent implements OnInit {

  private permisos: Permiso[];
  private totalItems: number;
  private limit: number;
  private page: number;
  private previousPage: number;

  constructor(private service: PermisoService) { }

  ngOnInit() {
    this.initPagination();
  }

  private initPagination(): void {
    this.totalItems = 0;
    this.page = this.previousPage = 1;
    this.limit = 20;

    this.service.getNumRecord().subscribe(data => {
      if(data.status == 200) {
        this.totalItems = data.data.count;
        this.getPermisos();
      }
    })
  }

  public changePage(page: number) {
    if(page !== this.previousPage) {
      this.previousPage = page;
      this.getPermisos();
    }
  }

  private getPermisos(): void {
    this.service.get(this.limit, this.page, ['id', 'descripcion']).subscribe(data => {
      if(data.status == 200) {
        this.permisos = data.data;
      }
    });
  }

  public delete(permiso: Permiso):void {
    this.service.delete(permiso.id).subscribe(data => {
      if(data.status == 200) {
        this.initPagination();
      }
    });
  }

}
