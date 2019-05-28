import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Usuario } from '../../models/usuario';

import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  private login : Usuario = {id: null, contrasena: "", id_persona: null, id_grupo_permiso: null};

  constructor(
    private location: Location,
    private message: MessageService,
    private service: AuthService) { }

  ngOnInit() { }

  submit(): void {
    if(this.login.id == null) {
      this.message.showMessage("Error", "Usuario vacío");
      return;  
    }
    if(this.login.contrasena == "") {
      this.message.showMessage("Error", "Contraseña vacía");
      return;
    }

    this.service.login(this.login).subscribe(data => {
      if(data.status == 200) {
        this.location.go('/');
        window.location.reload();
      }
    });
  }

}
