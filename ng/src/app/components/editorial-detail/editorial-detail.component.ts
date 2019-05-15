import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Editorial } from '../../models/editorial';
import { EditorialService } from '../../services/editorial.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'editorial-detail',
  templateUrl: './editorial-detail.component.html',
  styleUrls: ['./editorial-detail.component.scss']
})
export class EditorialDetailComponent implements OnInit {

  private editorial: Editorial = {id: null, nombre: ""};

  constructor(
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute, 
    private service: EditorialService) { }

  ngOnInit() {
      this.getEditorial();
  }

  private getEditorial(): void {
    const id: String = this.route.snapshot.paramMap.get('id');
    if(id) {  
      this.service.getEditorialByID(id).subscribe(data => {
        if(data.status == 200 && data.data[0] != undefined) {
          this.editorial = data.data[0];
        }
      });
    }
  }

  public submit(): void {
    if(this.editorial.id == null) {
      this.service.createEditorial(this.editorial).subscribe(data => {
        if(data.status == 200) {
          this.message.showMessage("Info", "Editorial Creada");
        }
        this.location.back();
      });
    }
    else {
      this.service.updateEditorial(this.editorial).subscribe(data => {
        if(data.status == 200) {
          this.message.showMessage("Info", "Editorial Actualizada");
        }
        this.location.back();
      });
    }
  }

}
