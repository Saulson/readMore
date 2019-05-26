import { Component, OnInit } from '@angular/core';

import { Editorial } from '../../models/editorial';

import { MessageService } from '../../services/message.service';
import { EditorialService } from '../../services/editorial.service';

@Component({
  selector: 'editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.scss']
})
export class EditorialComponent implements OnInit {

  private editoriales: Editorial[];
  private totalItems: number;
  private limit: number;
  private page: number;
  private previousPage: number;

  constructor(private service: EditorialService) { }

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
        this.getEditoriales();
      }
    })
  }

  public changePage(page: number) {
    if(page !== this.previousPage) {
      this.previousPage = page;
      this.getEditoriales();
    }
  }

  private getEditoriales(): void {
    this.service.getEditorial(this.limit, this.page).subscribe(data => {
      if(data.status == 200) {
        this.editoriales = data.data;
      }
    });
  }

  public delete(editorial: Editorial):void {
    this.service.deleteEditorial(editorial.id).subscribe(data => {
      if(data.status == 200) {
        this.editoriales = this.editoriales.filter(e => e !== editorial);
      }
    });
  }

}
