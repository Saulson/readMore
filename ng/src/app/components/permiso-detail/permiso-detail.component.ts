import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Permiso } from '../../models/permiso';
import { PermisoService } from '../../services/permiso.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'permiso-detail',
  templateUrl: './permiso-detail.component.html',
  styleUrls: ['./permiso-detail.component.scss']
})
export class PermisoDetailComponent implements OnInit {

  private permiso: Permiso = {
    id: null, 
    nombre: "",
    descripcion: "",
    crear: false,
    modificar: false,
    mostrar: false,
    eliminar: false,
    condicion: ""
  };
  private subscription;

  constructor(
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute, 
    private service: PermisoService) { }

  ngOnInit() {
    this.getPermiso();
  }

  private getPermiso(): void {
    const id: String = this.route.snapshot.paramMap.get('id');

    if(id) {  
      this.service.getByID(id).subscribe(data => {
        if(data.status == 200 && data.data.length != 0) {
          this.permiso = data.data[0];
          this.permiso.condicion = JSON.stringify(this.permiso.condicion);
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
    if(this.permiso.id == null) {
      this.service.create(this.permiso).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Permiso Creado", true).subscribe( _ => this.location.back() );
        }
      });
    }
    else {
      this.service.update(this.permiso).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Permiso Actualizado", true).subscribe( _ => this.location.back() );
        }
      });
    }
    
  }

  private validateForm(): boolean {
    if(this.permiso.nombre == "") {
      this.message.showMessage("Error", "Nombre Vacío");
      return false;
    }

    if(this.permiso.descripcion == "") {
      this.message.showMessage("Error", "Descripción Vacía");
      return false;
    }

    if(this.permiso.condicion != "") {
      try {
        JSON.parse(this.permiso.condicion.toString());
      } catch (e) {
        this.message.showMessage("Error", "Condición Inválida");
        return false;
      }
    }
    else {
      this.permiso.condicion = "{}";
    }

    return true;
  }

  ngOnDestroy() {
    if(this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

}
