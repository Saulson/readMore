import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { GrupoPermiso } from '../../models/grupo-permiso';
import { Persona } from '../../models/persona';
import { Usuario } from '../../models/usuario';

import { GrupoPermisoService } from '../../services/grupo-permiso.service';
import { PersonaService } from '../../services/persona.service';
import { UsuarioService } from '../../services/usuario.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.scss']
})
export class UsuarioDetailComponent implements OnInit {

  private usuario: Usuario = {
    id: null, 
    contrasena: null,
    id_persona: null,
    id_grupo_permiso: null,
  };

  private persona;

  private grupo;

  private subscription;

  constructor(
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute, 
    private service: UsuarioService,
    private serviceGrupo: GrupoPermisoService,
    private servicePersona: PersonaService) { }

  ngOnInit() {
    this.getPersona();
  }

  private getPersona(): void {
    const id: String = this.route.snapshot.paramMap.get('id');

    if(id) {  
      this.service.getUsuarioByID(id).subscribe(data => {
        if(data.status == 200 && data.data.length != 0) {
          this.usuario = data.data[0];

          this.serviceGrupo.getByID(this.usuario.id_grupo_permiso).subscribe(data => {
            if(data.status == 200 && data.data.length != 0) {
              this.grupo = data.data[0];
            }
          });

          this.servicePersona.getByID(this.usuario.id_persona).subscribe(data => {
            if(data.status == 200 && data.data.length != 0) {
              this.persona = data.data[0];
            }
          });
        }
        else {
          //FIXME no se aprecia el mensaje porque se carga primero el menu 
          this.subscription = this.message.showMessage("Error", 
          "La persona con el id " + id + " no existe", 
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
    if(this.usuario.id == null) {
      this.service.create(this.usuario).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Usuario Creado", true).subscribe( _ => this.location.back() );
        }
      });
    }
    else {
      this.service.update(this.usuario).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Persona Actualizada", true).subscribe( _ => this.location.back() );
        }
      });
    }
    
  }

  private validateForm(): boolean {
    if(this.grupo == undefined || !(this.grupo instanceof Object)) {
      this.message.showMessage("Error", "Grupo Invalido");
      return false;
    }
    else {
      this.usuario.id_grupo_permiso = this.grupo.id;
    }

    if(this.persona == undefined || !(this.persona instanceof Object)) {
      this.message.showMessage("Error", "Colonia inválida");
      return false;
    }
    else {
      this.usuario.id_persona = this.persona.id;
    }

    return true;
  }

  searchGrupo = (text$: Observable<String>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.serviceGrupo.getByNombre(term)
      )
    )

  formatterGrupo = (c: GrupoPermiso) => c.nombre;

  searchPersona = (text$: Observable<String>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.servicePersona.getByNombre(term)
      )
    )

  formatterPersona = (c: Persona) => c.nombre;

  ngOnDestroy() {
    if(this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

}
