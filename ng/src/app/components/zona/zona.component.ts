import { Component, OnInit } from '@angular/core';

import { Zona } from '../../models/zona';

import { MessageService } from '../../services/message.service';
import { ZonaService } from '../../services/zona.service';

@Component({
  selector: 'zona',
  templateUrl: './zona.component.html',
  styleUrls: ['./zona.component.scss']
})
export class ZonaComponent implements OnInit {

  private zonas: Zona[];
  private totalItems: number;
  private limit: number;
  private page: number;
  private previousPage: number;

  constructor(private service: ZonaService) { }

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
        this.getZonas();
      }
    })
  }

  public changePage(page: number) {
    if(page !== this.previousPage) {
      this.previousPage = page;
      this.getZonas();
    }
  }

  private getZonas(): void {
    this.service.get(this.limit, this.page, ['id', 'nombre']).subscribe(data => {
      if(data.status == 200) {
        this.zonas = data.data;
      }
    });
  }

  public delete(zona: Zona):void {
    this.service.delete(zona.id).subscribe(data => {
      if(data.status == 200) {
        this.initPagination();
      }
    });
  }

}
