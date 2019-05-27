import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Estado } from '../../models/estado';
import { EstadoService } from '../../services/estado.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'estado-detail',
  templateUrl: './estado-detail.component.html',
  styleUrls: ['./estado-detail.component.scss']
})
export class EstadoDetailComponent implements OnInit {

  private estado: Estado = {id: null, descripcion: "", circulacion: false};
  private subscription;

  constructor(
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute, 
    private service: EstadoService) { }

  ngOnInit() {
    this.getEstado();
  }

  private getEstado(): void {
    const id: String = this.route.snapshot.paramMap.get('id');

    if(id) {  
      this.service.getByID(id).subscribe(data => {
        if(data.status == 200 && data.data.length != 0) {
          this.estado = data.data[0];
        }
        else {
          //FIXME no se aprecia el mensaje porque se carga primero el menu 
          this.subscription = this.message.showMessage("Error", 
          "La editorial con el id " + id + " no existe", 
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
    if(this.estado.id == null) {
      this.service.create(this.estado).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Editorial Creada", true).subscribe( _ => this.location.back() );
        }
      });
    }
    else {
      this.service.update(this.estado).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Editorial Actualizada", true).subscribe( _ => this.location.back() );
        }
      });
    }
    
  }

  private validateForm(): boolean {
    if(this.estado.descripcion == "") {
      this.message.showMessage("Error", "Descripción Vacía");
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
