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

  editoriales: Editorial[];

  constructor(private service: EditorialService) { }

  ngOnInit() {
    this.getEditoriales();
  }

  private getEditoriales(): void {
    this.service.getEditorial().subscribe(data => {
      if(data.status == 200) {
        this.editoriales = data.data;
      }
    });
  }

  delete(editorial: Editorial){
    this.service.deleteEditorial(editorial.id).subscribe(data => {
      if(data.status == 200) {
        this.editoriales = this.editoriales.filter(e => e !== editorial);
      }
    });
  }

}
