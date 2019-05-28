import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../models/usuario';

import { MessageService } from '../../services/message.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  private usuarios: Usuario[];
  private totalItems: number;
  private limit: number;
  private page: number;
  private previousPage: number;

  constructor(private service: UsuarioService) { }

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
        this.getUsuarios();
      }
    })
  }

  public changePage(page: number) {
    if(page !== this.previousPage) {
      this.previousPage = page;
      this.getUsuarios();
    }
  }

  private getUsuarios(): void {
    this.service.get(this.limit, this.page, ['id']).subscribe(data => {
      if(data.status == 200) {
        this.usuarios = data.data;
      }
    });
  }

  public delete(usuario: Usuario):void {
    this.service.delete(usuario.id).subscribe(data => {
      if(data.status == 200) {
        this.initPagination();
      }
    });
  }

}
