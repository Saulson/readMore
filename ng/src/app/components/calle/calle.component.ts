import { Component, OnInit } from '@angular/core';

import { Calle } from '../../models/calle';

import { MessageService } from '../../services/message.service';
import { CalleService } from '../../services/calle.service';

@Component({
  selector: 'calle',
  templateUrl: './calle.component.html',
  styleUrls: ['./calle.component.scss']
})
export class CalleComponent implements OnInit {

  private calles: Calle[];
  private totalItems: number;
  private limit: number;
  private page: number;
  private previousPage: number;

  constructor(private service: CalleService) { }

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
        this.getCalles();
      }
    })
  }

  public changePage(page: number) {
    if(page !== this.previousPage) {
      this.previousPage = page;
      this.getCalles();
    }
  }

  private getCalles(): void {
    this.service.get(this.limit, this.page).subscribe(data => {
      if(data.status == 200) {
        this.calles = data.data;
      }
    });
  }

  public delete(calle: Calle):void {
    this.service.delete(calle.id).subscribe(data => {
      if(data.status == 200) {
        this.calles = this.calles.filter(e => e !== calle);
        this.limit
      }
    });
  }

}
