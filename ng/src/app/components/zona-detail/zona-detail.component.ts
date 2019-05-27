import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Zona } from '../../models/zona';
import { ZonaService } from '../../services/zona.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-zona-detail',
  templateUrl: './zona-detail.component.html',
  styleUrls: ['./zona-detail.component.scss']
})
export class ZonaDetailComponent implements OnInit {

  private zona: Zona = {id: null, nombre: "", foto: null};
  private subscription;

  constructor(
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute, 
    private service: ZonaService) { }

  ngOnInit() {
    this.getZona();
  }

  private getZona(): void {
    const id: String = this.route.snapshot.paramMap.get('id');

    if(id) {  
      this.service.getByID(id).subscribe(data => {
        if(data.status == 200 && data.data.length != 0) {
          this.zona = data.data[0];          
        }
        else {
          //FIXME no se aprecia el mensaje porque se carga primero el menu 
          this.subscription = this.message.showMessage("Error", 
          "La zona con el id " + id + " no existe", 
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
    if(this.zona.id == null) {
      this.service.create(this.zona).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Zona Creada", true).subscribe( _ => this.location.back() );
        }
      });
    }
    else {
      this.service.update(this.zona).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Zona Actualizada", true).subscribe( _ => this.location.back() );
        }
      });
    }
    
  }

  private validateForm(): boolean {
    if(this.zona.nombre == "") {
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

  openFile(event) {
    let reader = new FileReader();
    reader.onload = () => {
        this.zona.foto = btoa(reader.result.toString()).replace(/\+/gi, '%2B');
    }
    
    reader.readAsBinaryString(event.target.files[0]);
    
  }

}
