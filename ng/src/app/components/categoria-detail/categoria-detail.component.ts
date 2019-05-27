import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'categoria-detail',
  templateUrl: './categoria-detail.component.html',
  styleUrls: ['./categoria-detail.component.scss']
})
export class CategoriaDetailComponent implements OnInit {

  private categoria: Categoria = {id: null, nombre: ""}
  private subscription;

  constructor(
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute,
    private service: CategoriaService) { }

  ngOnInit() {
    this.getCategoria();
  }

  private getCategoria(): void {
    const id: String = this.route.snapshot.paramMap.get('id');

    if(id) {
      this.service.getByID(id).subscribe(data => {
        if(data.status == 200 && data.data.length != 0) {
          this.categoria = data.data[0];
        }
        else {
          //FIXME no se aprecia el mensaje porque se carga primero el menu 
          this.subscription = this.message.showMessage("Error", 
          "La categoria con el id " + id + " no existe", 
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
    if(this.categoria.id == null) {
      this.service.create(this.categoria).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Categoria Creada", true).subscribe( _ => this.location.back() );
        }
      });
    }
    else {
      this.service.update(this.categoria).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Categoria Actualizada", true).subscribe( _ => this.location.back() );
        }
      });
    } 
  }

  private validateForm(): boolean {
    if(this.categoria.nombre == "") {
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
