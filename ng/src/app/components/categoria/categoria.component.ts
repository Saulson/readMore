import { Component, OnInit } from '@angular/core';

import { Categoria } from '../../models/categoria';

import { MessageService } from '../../services/message.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  private categorias: Categoria[];
  private totalItems: number;
  private limit: number;
  private page: number;
  private previousPage: number;

  constructor(private service: CategoriaService) { }

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
        this.getCategorias();
      }
    })
  }

  public changePage(page: number) {
    if(page !== this.previousPage) {
      this.previousPage = page;
      this.getCategorias();
    }
  }

  private getCategorias(): void {
    this.service.get(this.limit, this.page).subscribe(data => {
      if(data.status == 200) {
        this.categorias = data.data;
      }
    });
  }

  public delete(categoria: Categoria):void {
    this.service.delete(categoria.id).subscribe(data => {
      if(data.status == 200) {
        this.initPagination();
      }
    });
  }

}
