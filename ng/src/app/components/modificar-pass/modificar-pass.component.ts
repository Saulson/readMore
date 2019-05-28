import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-modificar-pass',
  templateUrl: './modificar-pass.component.html',
  styleUrls: ['./modificar-pass.component.scss']
})
export class ModificarPassComponent implements OnInit {

  private usuario: Usuario = {id: null, contrasena: "", id_persona: 
    null, id_grupo_permiso: null};
  private subscription;

  constructor(
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute,
    private service: UsuarioService) { }

  ngOnInit() {
    this.getUsuario();
  }

  private getUsuario(): void {
    const id: String = this.route.snapshot.paramMap.get('id');

    this.service.getUsuarioByID(id).subscribe(data => {
      if(data.status == 200 && data.data.length != 0) {
        this.usuario.id = id;
      }
      else {
        //FIXME no se aprecia el mensaje porque se carga primero el menu 
        this.subscription = this.message.showMessage("Error", 
          "La usuario con el id " + id + " no existe", 
          true).subscribe(_ => this.location.back() );
      }
    });
  
  }

  public back(): void {
    this.location.back();
  }

  public submit(): void {
    this.service.cambiarPass(this.usuario).subscribe(data => {
      if(data.status == 200) {
        this.subscription = this.message.showMessage("Info", 
          "Contraseña Cambiada", true).subscribe( _ => this.location.back() );
      }
    });
  }

  ngOnDestroy() {
    if(this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

}
