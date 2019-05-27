import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Configuracion } from '../../models/configuracion';
import { ConfiguracionService } from '../../services/configuracion.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  private config: Configuracion = {nombre: "", logo: null, max_prestamos: "", tiempo_prestamos: ""};
  private subscription;

  constructor(
    private location: Location,
    private message: MessageService,
    private service: ConfiguracionService) { }

  ngOnInit() {
    this.getConfiguracion();
  }

  private getConfiguracion(): void {
    this.service.getConf().subscribe(data => {
      if(data.status == 200 && data.data.length != 0) {
        this.config = data.data[0];
      }
      else {
        //FIXME no se aprecia el mensaje porque se carga primero el menu 
        this.subscription = this.message.showMessage("Error", 
        "No se pudo obtener la configuración", 
        true).subscribe(_ => this.location.back() );
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
    this.service.update(this.config).subscribe(data => {
      if(data.status == 200) {
        this.subscription = this.message.showMessage("Info", 
          "Configuración Actualizada", true).subscribe( _ => window.location.reload() );
      }
    });
  }

  private validateForm(): boolean {
    if(this.config.nombre == "") {
      this.message.showMessage("Error", "Nombre Vacío");
      return false;
    }

    if(this.config.max_prestamos == "" 
      || this.config.max_prestamos.toString().includes('.') 
      || isNaN(parseInt(this.config.max_prestamos.toString()))) {
      this.message.showMessage("Error", "Máximo de Prestamos no válido");
      return false;
    }

    if(this.config.tiempo_prestamos == "" 
      || this.config.tiempo_prestamos.toString().includes('.') 
      || isNaN(parseInt(this.config.tiempo_prestamos.toString()))) {
      this.message.showMessage("Error", "Máximo de Prestamos no válido");
      return false;
    }

    return true;
  }

  openFile(event) {
    let reader = new FileReader();
    reader.onload = () => {
        this.config.logo = btoa(reader.result.toString()).replace(/\+/gi, '%2B');
    }
    
    reader.readAsBinaryString(event.target.files[0]);
  }

  ngOnDestroy() {
    if(this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

}
