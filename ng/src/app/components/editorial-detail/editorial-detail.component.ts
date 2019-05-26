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
  private subscription;

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
        if(data.status == 200 && data.data.length != 0) {
          this.editorial = data.data[0];
        }
        else {
          //FIXME no se aprecia el mensaje porque se carga primero el menu 
          this.subscription = this.message.showMessage("Error", 
          "El registro con el id " + id + " no existe", 
          true).subscribe(_ => this.location.back() );
        }
      });
    }
  }

  public back(): void {
    this.location.back();
  }

  public submit(): void {
    if(!this.validateForm()) {
      return;
    }
    if(this.editorial.id == null) {
      this.service.createEditorial(this.editorial).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Editorial Creada", true).subscribe( _ => this.location.back() );
        }
      });
    }
    else {
      this.service.updateEditorial(this.editorial).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Editorial Actualizada", true).subscribe( _ => this.location.back() );
        }
      });
    }
    
  }

  private validateForm(): boolean {
    if(this.editorial.nombre == "") {
      this.message.showMessage("Error", "Nombre Vacío");
      return false;
    }

    return true;
  }

  ngOnDestroy() {
    if(this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

}
