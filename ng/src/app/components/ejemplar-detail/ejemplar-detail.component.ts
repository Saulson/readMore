import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Estado } from '../../models/estado';
import { Libro } from '../../models/libro';

import { EstadoService } from '../../services/estado.service';
import { LibroService } from '../../services/libro.service';

import { Ejemplar } from '../../models/ejemplar';
import { EjemplarService } from '../../services/ejemplar.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'ejemplar-detail',
  templateUrl: './ejemplar-detail.component.html',
  styleUrls: ['./ejemplar-detail.component.scss']
})
export class EjemplarDetailComponent implements OnInit {

  private ejemplar: Ejemplar = {
    id: null, 
    num_ejemplar: "",
    comentario: "",
    id_libro: null,
    id_estado: null
  };

  private libro;
  private estado;

  private subscription;

  constructor(
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute, 
    private service: EjemplarService,
    private serviceLibro: LibroService,
    private serviceEstado: EstadoService) { }

  ngOnInit() {
    this.getEjemplar();
  }

  private getEjemplar(): void {
    const id: String = this.route.snapshot.paramMap.get('id');

    if(id) {  
      this.service.getByID(id).subscribe(data => {
        if(data.status == 200 && data.data.length != 0) {
          this.ejemplar = data.data[0];

          this.serviceLibro.getByID(this.ejemplar.id_libro).subscribe(data => {
            if(data.status == 200 && data.data.length != 0) {
              this.libro = data.data[0];
            }
          });

          this.serviceEstado.getByID(this.ejemplar.id_estado).subscribe(data => {
            if(data.status == 200 && data.data.length != 0) {
              this.estado = data.data[0];
            }
          });
        }
        else {
          //FIXME no se aprecia el mensaje porque se carga primero el menu 
          this.subscription = this.message.showMessage("Error", 
          "El ejemplar con el id " + id + " no existe", 
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
    if(this.ejemplar.id == null) {
      this.service.create(this.ejemplar).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Ejemplar Creado", true).subscribe( _ => this.location.back() );
        }
      });
    }
    else {
      this.service.update(this.ejemplar).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Ejemplar Actualizado", true).subscribe( _ => this.location.back() );
        }
      });
    }
    
  }

  private validateForm(): boolean {
    if(this.ejemplar.num_ejemplar == "" 
      || this.ejemplar.num_ejemplar.toString().includes('.') 
      || isNaN(parseInt(this.ejemplar.num_ejemplar.toString()))) {
      this.message.showMessage("Error", "Número de Ejemplar inválido");
      return false;
    }

    if(this.libro == undefined || !(this.libro instanceof Object)) {
      this.message.showMessage("Error", "Libro inválido");
      return false;
    }
    else {
      this.ejemplar.id_libro = this.libro.id;
    }

    if(this.estado == undefined || !(this.estado instanceof Object)) {
      this.message.showMessage("Error", "Estado inválido");
      return false;
    }
    else {
      this.ejemplar.id_estado = this.estado.id;
    }

    return true;
  }

  searchLibro = (text$: Observable<String>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.serviceLibro.getByTitulo(term)
      )
    )

  formatterLibro = (c: Libro) => c.titulo;

  searchEstado = (text$: Observable<String>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.serviceEstado.getByDescripcion(term)
      )
    )

  formatterEstado = (c: Estado) => c.descripcion;

  ngOnDestroy() {
    if(this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

}
