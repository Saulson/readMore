import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { GrupoPermiso } from '../../models/grupo-permiso';
import { GrupoPermisoService } from '../../services/grupo-permiso.service';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'grupo-permiso-detail',
  templateUrl: './grupo-permiso-detail.component.html',
  styleUrls: ['./grupo-permiso-detail.component.scss']
})
export class GrupoPermisoDetailComponent implements OnInit {

  private grupo: GrupoPermiso = {id: null, nombre: ""};
  private subscription;

  constructor(
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute, 
    private service: GrupoPermisoService) { }

  ngOnInit() {
    this.getGrupo();
  }

  private getGrupo(): void {
    const id: String = this.route.snapshot.paramMap.get('id');

    if(id) {  
      this.service.getByID(id).subscribe(data => {
        if(data.status == 200 && data.data.length != 0) {
          this.grupo = data.data[0];
        }
        else {
          //FIXME no se aprecia el mensaje porque se carga primero el menu 
          this.subscription = this.message.showMessage("Error", 
          "El grupo con el id " + id + " no existe", 
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
    if(this.grupo.id == null) {
      this.service.create(this.grupo).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Grupo Creado", true).subscribe( _ => this.location.back() );
        }
      });
    }
    else {
      this.service.update(this.grupo).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Grupo Actualizado", true).subscribe( _ => this.location.back() );
        }
      });
    }
    
  }

  private validateForm(): boolean {
    if(this.grupo.nombre == "") {
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
