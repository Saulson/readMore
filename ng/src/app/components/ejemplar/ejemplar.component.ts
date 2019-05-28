import { Component, OnInit } from '@angular/core';

import { Ejemplar } from '../../models/ejemplar';

import { MessageService } from '../../services/message.service';
import { EjemplarService } from '../../services/ejemplar.service';

@Component({
  selector: 'ejemplar',
  templateUrl: './ejemplar.component.html',
  styleUrls: ['./ejemplar.component.scss']
})
export class EjemplarComponent implements OnInit {

  private ejemplares: Ejemplar[];
  private totalItems: number;
  private limit: number;
  private page: number;
  private previousPage: number;

  constructor(private service: EjemplarService) { }

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
        this.getEjemplares();
      }
    })
  }

  public changePage(page: number) {
    if(page !== this.previousPage) {
      this.previousPage = page;
      this.getEjemplares();
    }
  }

  private getEjemplares(): void {
    this.service.get(this.limit, this.page, ['id']).subscribe(data => {
      if(data.status == 200) {
        this.ejemplares = data.data;
      }
    });
  }

  public delete(ejemplar: Ejemplar):void {
    this.service.delete(ejemplar.id).subscribe(data => {
      if(data.status == 200) {
        this.initPagination();
      }
    });
  }

}
