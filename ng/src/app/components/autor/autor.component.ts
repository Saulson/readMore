import { Component, OnInit } from '@angular/core';

import { Autor } from '../../models/autor';

import { MessageService } from '../../services/message.service';
import { AutorService } from '../../services/autor.service';

@Component({
  selector: 'autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.scss']
})
export class AutorComponent implements OnInit {

  private autores: Autor[];
  private totalItems: number;
  private limit: number;
  private page: number;
  private previousPage: number;

  constructor(private service: AutorService) { }

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
        this.getAutores();
      }
    })
  }

  public changePage(page: number) {
    if(page !== this.previousPage) {
      this.previousPage = page;
      this.getAutores();
    }
  }

  private getAutores(): void {
    this.service.get(this.limit, this.page, ['id', 'nombre']).subscribe(data => {
      if(data.status == 200) {
        this.autores = data.data;
      }
    });
  }

  public delete(autor: Autor):void {
    this.service.delete(autor.id).subscribe(data => {
      if(data.status == 200) {
        this.initPagination();
      }
    });
  }

}
