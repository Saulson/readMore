import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth.service';

import { Menu } from '../../models/menu';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = '';
  menus: Menu[];
  id_usuario: Number;

  constructor(
    private auth: AuthService,
    private location: Location,
    private service: AppService
    ) {}

  ngOnInit() {
    this.getName();
    this.getIDUsuario();
  }

  private getName(): void {
    this.service.getName().subscribe( data => {
      if (data.status == 200) {
        this.name = data.data.nombre;
      }
    })
  }

  private getIDUsuario(): void {
    this.auth.getIDUsuario().subscribe( data => {
      if (data.status == 200) {
        this.id_usuario = data.data.id;
        this.getMenu();
      }
    })
  }

  private getMenu(): void {
    this.service.getMenu(this.id_usuario).subscribe( data => {
      if(data.status == 200) {
        this.menus = data.data;
      }
    })
  }

  logout(): void {
    this.auth.logout().subscribe( _ => {
      this.location.go('/');
      window.location.reload();
    });
  }

  /*<input type='file' accept="image/jpeg,image/jpg,image/png" (change)='openFile($event)'/>
  openFile(event) {
    let input = event.target;
    let reader = new FileReader();
    reader.onload = () => {
        var text = reader.result;
        miobj = btoa(text)
    }
    
    reader.readAsBinaryString(event.target.files[0]);
    
  }*/
}
