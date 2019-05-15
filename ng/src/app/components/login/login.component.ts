import { Component, OnInit } from '@angular/core';

import { Login } from '../../models/login';

import { MessageService } from '../../services/message.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  private login : Login;

  constructor(
    private message: MessageService,
    private service: LoginService) { }

  ngOnInit() {
    this.login = {id: null, contrasena: ""}
  }

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
      //TODO redireccionar y calcular a que tiene accesso
    });
  }

}
