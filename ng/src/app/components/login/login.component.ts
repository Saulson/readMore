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
    this.login = {user: null, password: ""}
  }

  submit(): void {
    if(this.login.user == null) {
      this.message.showMessage("Error", "Usuario vacío");
      return;  
    }
    if(this.login.password == "") {
      this.message.showMessage("Error", "Contraseña vacía");
      return;
    }

    this.service.login(this.login).subscribe(data => {
      //TODO redireccionar y calcular a que tiene accesso
    });
  }

}
