import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Autor } from '../../models/autor';
import { AutorService } from '../../services/autor.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'autor-detail',
  templateUrl: './autor-detail.component.html',
  styleUrls: ['./autor-detail.component.scss']
})
export class AutorDetailComponent implements OnInit {

  private autor: Autor = {id: null, nombre: "", apeidop: "", apeidom: ""};
  private subscription;

  constructor(
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute,
    private service: AutorService) { }

  ngOnInit() {
    this.getAutor();
  }

  private getAutor(): void {
    const id: String = this.route.snapshot.paramMap.get('id');

    if(id) {
      this.service.getByID(id).subscribe(data => {
        if(data.status == 200 && data.data.length != 0) {
          this.autor = data.data[0];
        }
        else {
          //FIXME no se aprecia el mensaje porque se carga primero el menu 
          this.subscription = this.message.showMessage("Error", 
          "El autor con el id " + id + " no existe", 
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
    if(this.autor.id == null) {
      this.service.create(this.autor).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Autor Creado", true).subscribe( _ => this.location.back() );
        }
      });
    }
    else {
      this.service.update(this.autor).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Autor Actualizado", true).subscribe( _ => this.location.back() );
        }
      });
    } 
  }

  private validateForm(): boolean {
    if(this.autor.nombre == "") {
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
