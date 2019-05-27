import { Component, OnInit } from '@angular/core';

import { GrupoPermiso } from '../../models/grupo-permiso';

import { MessageService } from '../../services/message.service';
import { GrupoPermisoService } from '../../services/grupo-permiso.service';

@Component({
  selector: 'grupo-permiso',
  templateUrl: './grupo-permiso.component.html',
  styleUrls: ['./grupo-permiso.component.scss']
})
export class GrupoPermisoComponent implements OnInit {

  private grupos: GrupoPermiso[];
  private totalItems: number;
  private limit: number;
  private page: number;
  private previousPage: number;

  constructor(private service: GrupoPermisoService) { }

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
        this.getGrupos();
      }
    })
  }

  public changePage(page: number) {
    if(page !== this.previousPage) {
      this.previousPage = page;
      this.getGrupos();
    }
  }

  private getGrupos(): void {
    this.service.get(this.limit, this.page).subscribe(data => {
      if(data.status == 200) {
        this.grupos = data.data;
      }
    });
  }

  public delete(grupo: GrupoPermiso):void {
    this.service.delete(grupo.id).subscribe(data => {
      if(data.status == 200) {
        this.initPagination();
      }
    });
  }

}
