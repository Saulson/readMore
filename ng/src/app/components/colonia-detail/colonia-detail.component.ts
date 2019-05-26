import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Colonia } from '../../models/colonia';
import { ColoniaService } from '../../services/colonia.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'colonia-detail',
  templateUrl: './colonia-detail.component.html',
  styleUrls: ['./colonia-detail.component.scss']
})
export class ColoniaDetailComponent implements OnInit {

  private colonia: Colonia = {id: null, nombre: ""}
  private subscription;

  constructor(
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute,
    private service: ColoniaService) { }

  ngOnInit() {
    this.getColonia();
  }

  private getColonia(): void {
    const id: String = this.route.snapshot.paramMap.get('id');

    if(id) {
      this.service.getColoniaByID(id).subscribe(data => {
        if(data.status == 200 && data.data.length != 0) {
          this.colonia = data.data[0];
        }
        else {
          //FIXME no se aprecia el mensaje porque se carga primero el menu 
          this.subscription = this.message.showMessage("Error", 
          "La colonia con el id " + id + " no existe", 
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
    if(this.colonia.id == null) {
      this.service.createColonia(this.colonia).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Colonia Creada", true).subscribe( _ => this.location.back() );
        }
      });
    }
    else {
      this.service.updateColonia(this.colonia).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Colonia Actualizada", true).subscribe( _ => this.location.back() );
        }
      });
    } 
  }

  private validateForm(): boolean {
    if(this.colonia.nombre == "") {
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
