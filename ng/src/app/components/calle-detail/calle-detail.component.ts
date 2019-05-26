import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Calle } from '../../models/calle';
import { CalleService } from '../../services/calle.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-calle-detail',
  templateUrl: './calle-detail.component.html',
  styleUrls: ['./calle-detail.component.scss']
})
export class CalleDetailComponent implements OnInit {

  private calle: Calle = {id: null, nombre: ""}
  private subscription;

  constructor(
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute,
    private service: CalleService) { }

  ngOnInit() {
    this.getColonia();
  }

  private getColonia(): void {
    const id: String = this.route.snapshot.paramMap.get('id');

    if(id) {
      this.service.getByID(id).subscribe(data => {
        if(data.status == 200 && data.data.length != 0) {
          this.calle = data.data[0];
        }
        else {
          //FIXME no se aprecia el mensaje porque se carga primero el menu 
          this.subscription = this.message.showMessage("Error", 
          "La calle con el id " + id + " no existe", 
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
    if(this.calle.id == null) {
      this.service.create(this.calle).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Calle Creada", true).subscribe( _ => this.location.back() );
        }
      });
    }
    else {
      this.service.update(this.calle).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Calle Actualizada", true).subscribe( _ => this.location.back() );
        }
      });
    } 
  }

  private validateForm(): boolean {
    if(this.calle.nombre == "") {
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
