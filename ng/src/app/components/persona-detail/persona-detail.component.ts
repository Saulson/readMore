import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

import { Calle } from '../../models/calle';
import { Colonia } from '../../models/colonia';
import { Persona } from '../../models/persona';

import { CalleService } from '../../services/calle.service';
import { ColoniaService } from '../../services/colonia.service';
import { PersonaService } from '../../services/persona.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'persona-detail',
  templateUrl: './persona-detail.component.html',
  styleUrls: ['./persona-detail.component.scss']
})
export class PersonaDetailComponent implements OnInit {

  private persona: Persona = {
    id: null, 
    nombre: "",
    apeidop: "",
    apeidom: "",
    correo: "",
    telefono: "",
    numero: "",
    id_colonia: null,
    id_calle: null,
  };

  private calle;
  private buscandoCalle: boolean = false;

  private colonia;
  private buscandoColonia: boolean = false;

  private subscription;

  constructor(
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute, 
    private service: PersonaService,
    private serviceCalle: CalleService,
    private serviceColonia: ColoniaService) { }

  ngOnInit() {
    this.getPersona();
  }

  private getPersona(): void {
    const id: String = this.route.snapshot.paramMap.get('id');

    if(id) {  
      this.service.getByID(id).subscribe(data => {
        if(data.status == 200 && data.data.length != 0) {
          this.persona = data.data[0];

          this.serviceCalle.getByID(this.persona.id_calle).subscribe(data => {
            if(data.status == 200 && data.data.length != 0) {
              this.calle = data.data[0];
            }
          });

          this.serviceColonia.getByID(this.persona.id_colonia).subscribe(data => {
            if(data.status == 200 && data.data.length != 0) {
              this.colonia = data.data[0];
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
    if(this.persona.id == null) {
      this.service.create(this.persona).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Persona Creada", true).subscribe( _ => this.location.back() );
        }
      });
    }
    else {
      this.service.update(this.persona).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Persona Actualizada", true).subscribe( _ => this.location.back() );
        }
      });
    }
    
  }

  private validateForm(): boolean {
    if(this.persona.nombre == "") {
      this.message.showMessage("Error", "Nombre Vacío");
      return false;
    }

    if(this.persona.correo == "") {
      this.message.showMessage("Error", "Correo Vacío");
      return false;
    }

    if(this.calle == undefined || !(this.calle instanceof Object)) {
      this.message.showMessage("Error", "Calle invalida");
      return false;
    }
    else {
      this.persona.id_calle = this.calle.id;
    }

    if(this.colonia == undefined || !(this.colonia instanceof Object)) {
      this.message.showMessage("Error", "Colonia inválida");
      return false;
    }
    else {
      this.persona.id_colonia = this.colonia.id;
    }

    return true;
  }

  searchCalle = (text$: Observable<String>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.buscandoCalle = true),
      switchMap(term =>
        this.serviceCalle.getByNombre(term).pipe(
          tap(() => this.buscandoCalle = false)
        )
      ),
      tap(() => this.buscandoCalle = false)
    )

  formatterCalle = (c: Calle) => c.nombre;

  searchColonia = (text$: Observable<String>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.buscandoColonia = true),
      switchMap(term =>
        this.serviceColonia.getByNombre(term).pipe(
          tap(() => this.buscandoColonia = false)
        )
      ),
      tap(() => this.buscandoCalle = false)
    )

  formatterColonia = (c: Colonia) => c.nombre;

  ngOnDestroy() {
    if(this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

}
