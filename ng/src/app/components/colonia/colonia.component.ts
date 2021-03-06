import { Component, OnInit } from '@angular/core';

import { Colonia } from '../../models/colonia';

import { MessageService } from '../../services/message.service';
import { ColoniaService } from '../../services/colonia.service';

@Component({
  selector: 'colonia',
  templateUrl: './colonia.component.html',
  styleUrls: ['./colonia.component.scss']
})
export class ColoniaComponent implements OnInit {

  private colonias: Colonia[];
  private totalItems: number;
  private limit: number;
  private page: number;
  private previousPage: number;

  constructor(private service: ColoniaService) { }

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
        this.getColonias();
      }
    })
  }

  public changePage(page: number) {
    if(page !== this.previousPage) {
      this.previousPage = page;
      this.getColonias();
    }
  }

  private getColonias(): void {
    this.service.get(this.limit, this.page).subscribe(data => {
      if(data.status == 200) {
        this.colonias = data.data;
      }
    });
  }

  public delete(colonia: Colonia):void {
    this.service.delete(colonia.id).subscribe(data => {
      if(data.status == 200) {
        this.initPagination();
      }
    });
  }

}
