import { Component, OnInit } from '@angular/core';

import { Prestamo } from '../../models/prestamo';

import { MessageService } from '../../services/message.service';
import { PrestamoService } from '../../services/prestamo.service';

@Component({
  selector: 'prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.scss']
})
export class PrestamoComponent implements OnInit {

  private prestamos: Prestamo[];
  private totalItems: number;
  private limit: number;
  private page: number;
  private previousPage: number;

  constructor(private service: PrestamoService) { }

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
        this.getPrestamos();
      }
    })
  }

  public changePage(page: number) {
    if(page !== this.previousPage) {
      this.previousPage = page;
      this.getPrestamos();
    }
  }

  private getPrestamos(): void {
    this.service.get(this.limit, this.page, ['id']).subscribe(data => {
      if(data.status == 200) {
        this.prestamos = data.data;
      }
    });
  }

  public delete(prestamo: Prestamo):void {
    this.service.delete(prestamo.id).subscribe(data => {
      if(data.status == 200) {
        this.initPagination();
      }
    });
  }

}
