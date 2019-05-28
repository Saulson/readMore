import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbCalendar, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Ejemplar } from '../../models/ejemplar';
import { EjemplarService } from '../../services/ejemplar.service';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

import { Prestamo } from '../../models/prestamo';
import { PrestamoService } from '../../services/prestamo.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'prestamo-detail',
  templateUrl: './prestamo-detail.component.html',
  styleUrls: ['./prestamo-detail.component.scss']
})
export class PrestamoDetailComponent implements OnInit {

  private prestamo: Prestamo = {
    id: null, 
    fecha_prestamo: "",
    fecha_devolucion: "",
    id_ejemplar: null,
    id_lector: null,
    id_empleado: null
  };

  private fecha_prestamo: NgbDateStruct;
  private fecha_devolucion: NgbDateStruct;
  private today = this.calendar.getToday();
  private ejemplar;
  private lector;
  private empleado;

  private subscription;

  constructor(
    private calendar: NgbCalendar,
    private dateParser: NgbDateParserFormatter,
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute, 
    private service: PrestamoService,
    private serviceEjemplar: EjemplarService,
    private serviceUsuario: UsuarioService) { }

  ngOnInit() {
    this.getEjemplar();
  }

  private getEjemplar(): void {
    const id: String = this.route.snapshot.paramMap.get('id');

    if(id) {  
      this.service.getByID(id).subscribe(data => {
        if(data.status == 200 && data.data.length != 0) {
          this.prestamo = data.data[0];

          this.serviceEjemplar.getByID(this.prestamo.id_ejemplar).subscribe(data => {
            if(data.status == 200 && data.data.length != 0) {
              this.ejemplar = data.data[0];
            }
          });

          this.serviceUsuario.getByID(this.prestamo.id_lector).subscribe(data => {
            if(data.status == 200 && data.data.length != 0) {
              this.lector = data.data[0];
            }
          });

          this.serviceUsuario.getByID(this.prestamo.id_empleado).subscribe(data => {
            if(data.status == 200 && data.data.length != 0) {
              this.empleado = data.data[0];
            }
          });

          //FIXME retonar los datos como texto conforme a la ISO
          this.fecha_prestamo = this.dateParser.parse(this.prestamo.fecha_prestamo.toString());
          this.fecha_devolucion = this.dateParser.parse(this.prestamo.fecha_devolucion.toString());
        }
        else {
          //FIXME no se aprecia el mensaje porque se carga primero el menu 
          this.subscription = this.message.showMessage("Error", 
          "El libro con el id " + id + " no existe", 
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
    if(this.prestamo.id == null) {
      this.service.create(this.prestamo).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Ejemplar Creado", true).subscribe( _ => this.location.back() );
        }
      });
    }
    else {
      this.service.update(this.prestamo).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Ejemplar Actualizado", true).subscribe( _ => this.location.back() );
        }
      });
    }
    
  }

  private validateForm(): boolean {
    if(this.ejemplar == undefined || !(this.ejemplar instanceof Object)) {
      this.message.showMessage("Error", "Ejemplar Inválido");
      return false;
    }
    else {
      this.prestamo.id_ejemplar = this.ejemplar.id;
    }

    if(this.lector == undefined || !(this.lector instanceof Object)) {
      this.message.showMessage("Error", "Lector Inválido");
      return false;
    }
    else {
      this.prestamo.id_lector = this.lector.id;
    }

    if(this.empleado == undefined || !(this.empleado instanceof Object)) {
      this.message.showMessage("Error", "Empleado Inválido");
      return false;
    }
    else {
      this.prestamo.id_empleado = this.empleado.id;
    }

    if(this.fecha_devolucion == undefined) {
      this.message.showMessage("Error", "Fecha Devolución Vacia");
      return false
    }
    else {
      this.prestamo.fecha_devolucion  = this.fecha_devolucion.year + "-"
        + this.fecha_devolucion.month + "-" + this.fecha_devolucion.day
    }

    if(this.fecha_prestamo == undefined) {
      this.message.showMessage("Error", "Fecha Prestamo Vacia");
      return false
    }
    else {
      this.prestamo.fecha_prestamo  = this.fecha_prestamo.year + "-"
        + this.fecha_prestamo.month + "-" + this.fecha_prestamo.day
    }

    return true;
  }

  searchEjemplar = (text$: Observable<String>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.serviceEjemplar.getByIDMap(term == "" ? "0" : term)
      )
    );

  formatterEjemplar = (c: Ejemplar) => c.id;

  searchUsuario = (text$: Observable<String>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => 
        this.serviceUsuario.getByIDMap(term == "" ? "0" : term)
      )
    );

  formatterUsuario = (c: Usuario) => c.id;

  ngOnDestroy() {
    if(this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

}
