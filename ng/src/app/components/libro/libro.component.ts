import { Component, OnInit } from '@angular/core';

import { Libro } from '../../models/libro';

import { MessageService } from '../../services/message.service';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.scss']
})
export class LibroComponent implements OnInit {

  private libros: Libro[];
  private totalItems: number;
  private limit: number;
  private page: number;
  private previousPage: number;

  constructor(private service: LibroService) { }

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
        this.getLibros();
      }
    })
  }

  public changePage(page: number) {
    if(page !== this.previousPage) {
      this.previousPage = page;
      this.getLibros();
    }
  }

  private getLibros(): void {
    this.service.get(this.limit, this.page, ['id', 'titulo']).subscribe(data => {
      if(data.status == 200) {
        this.libros = data.data;
      }
    });
  }

  public delete(libro: Libro):void {
    this.service.delete(libro.id).subscribe(data => {
      if(data.status == 200) {
        this.initPagination();
      }
    });
  }

}
