import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { Permiso } from '../../models/permiso';
import { AppService } from '../../services/app.service';
import { PermisoService } from '../../services/permiso.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'permiso-detail',
  templateUrl: './permiso-detail.component.html',
  styleUrls: ['./permiso-detail.component.scss']
})
export class PermisoDetailComponent implements OnInit {

  private permiso: Permiso = {
    id: null, 
    nombre: "",
    descripcion: "",
    crear: false,
    modificar: false,
    mostrar: false,
    eliminar: false,
    condicion: ""
  };
  private tablas: String[];
  private subscription;

  @ViewChild('nombre') instanceNombre: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute, 
    private service: PermisoService,
    private appService: AppService) { }

  ngOnInit() {
    this.getPermiso();
    this.getTablas();
  }

  private getPermiso(): void {
    const id: String = this.route.snapshot.paramMap.get('id');

    if(id) {  
      this.service.getByID(id).subscribe(data => {
        if(data.status == 200 && data.data.length != 0) {
          this.permiso = data.data[0];
          this.permiso.condicion = JSON.stringify(this.permiso.condicion);
        }
        else {
          //FIXME no se aprecia el mensaje porque se carga primero el menu 
          this.subscription = this.message.showMessage("Error", 
          "La editorial con el id " + id + " no existe", 
          true).subscribe(_ => this.location.back() );
        }
      });
    }
  }

  private getTablas(): void {
    this.appService.getTables().subscribe(data => {
      if(data.status == 200) {
        this.tablas = data.data;
      }
    });
  }

  public back(): void {
    this.location.back();
  }

  public submit(): void {
    if(!this.validateForm()) {
      return;
    }
    if(this.permiso.id == null) {
      this.service.create(this.permiso).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Permiso Creado", true).subscribe( _ => this.location.back() );
        }
      });
    }
    else {
      this.service.update(this.permiso).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Permiso Actualizado", true).subscribe( _ => this.location.back() );
        }
      });
    }
    
  }

  private validateForm(): boolean {
    if(this.permiso.nombre == "") {
      this.message.showMessage("Error", "Nombre Vacío");
      return false;
    }

    if(!this.tablas.includes(this.permiso.nombre)) {
      this.message.showMessage("Error", "Nombre no valido");
      return false;
    }

    if(this.permiso.descripcion == "") {
      this.message.showMessage("Error", "Descripción Vacía");
      return false;
    }

    if(this.permiso.condicion != "") {
      try {
        JSON.parse(this.permiso.condicion.toString());
      } catch (e) {
        this.message.showMessage("Error", "Condición Inválida");
        return false;
      }
    }
    else {
      this.permiso.condicion = "{}";
    }

    return true;
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instanceNombre.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.tablas
        : this.tablas.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 5))
    );
  }

  ngOnDestroy() {
    if(this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

}
