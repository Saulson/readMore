import { Component, OnInit } from '@angular/core';

import { Estado } from '../../models/estado';

import { MessageService } from '../../services/message.service';
import { EstadoService } from '../../services/estado.service';

@Component({
  selector: 'estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.scss']
})
export class EstadoComponent implements OnInit {

  private estados: Estado[];
  private totalItems: number;
  private limit: number;
  private page: number;
  private previousPage: number;

  constructor(private service: EstadoService) { }

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
        this.getEstados();
      }
    })
  }

  public changePage(page: number) {
    if(page !== this.previousPage) {
      this.previousPage = page;
      this.getEstados();
    }
  }

  private getEstados(): void {
    this.service.get(this.limit, this.page, ['id', 'descripcion']).subscribe(data => {
      if(data.status == 200) {
        this.estados = data.data;
      }
    });
  }

  public delete(estado: Estado):void {
    this.service.delete(estado.id).subscribe(data => {
      if(data.status == 200) {
        this.initPagination();
      }
    });
  }

}
