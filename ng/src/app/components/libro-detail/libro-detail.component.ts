import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { Editorial } from '../../models/editorial';
import { EditorialService } from '../../services/editorial.service';
import { Zona } from '../../models/zona';
import { ZonaService } from '../../services/zona.service';

import { Libro } from '../../models/libro';
import { LibroService } from '../../services/libro.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'libro-detail',
  templateUrl: './libro-detail.component.html',
  styleUrls: ['./libro-detail.component.scss']
})
export class LibroDetailComponent implements OnInit {

  private libro: Libro = {
      id: null, 
      titulo: "", 
      isbn: "",
      portada: null,
      id_categoria: null,
      id_editorial: null,
      id_zona: null
  };

  private categoria;
  private editorial;
  private zona;

  private subscription;

  constructor(
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute, 
    private service: LibroService,
    private serviceCategoria: CategoriaService,
    private serviceEditorial: EditorialService,
    private serviceZona: ZonaService) { }

  ngOnInit() {
    this.getLibro();
  }

  private getLibro(): void {
    const id: String = this.route.snapshot.paramMap.get('id');

    if(id) {  
      this.service.getByID(id).subscribe(data => {
        if(data.status == 200 && data.data.length != 0) {
          this.libro = data.data[0];

          this.serviceCategoria.getByID(this.libro.id_categoria).subscribe(data => {
            if(data.status == 200 && data.data.length != 0) {
              this.categoria = data.data[0];
            }
          });

          this.serviceEditorial.getByID(this.libro.id_editorial).subscribe(data => {
            if(data.status == 200 && data.data.length != 0) {
              this.editorial = data.data[0];
            }
          });

          this.serviceZona.getByID(this.libro.id_zona).subscribe(data => {
            if(data.status == 200 && data.data.length != 0) {
              this.zona = data.data[0];
            }
          });
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
    if(this.libro.id == null) {
      this.service.create(this.libro).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Libro Creado", true).subscribe( _ => this.location.back() );
        }
      });
    }
    else {
      this.service.update(this.libro).subscribe(data => {
        if(data.status == 200) {
          this.subscription = this.message.showMessage("Info", 
            "Libro Actualizado", true).subscribe( _ => this.location.back() );
        }
      });
    }
    
  }

  openFile(event) {
    let reader = new FileReader();
    reader.onload = () => {
        this.libro.portada = btoa(reader.result.toString()).replace(/\+/gi, '%2B');
    }
    
    reader.readAsBinaryString(event.target.files[0]);
    
  }

  private validateForm(): boolean {
    if(this.libro.titulo == "") {
      this.message.showMessage("Error","Título Vacío");
      return false;
    }

    if(this.libro.isbn == "") {
      this.message.showMessage("Error","ISBN Vacío");
      return false;
    }

    if(this.categoria == undefined || !(this.categoria instanceof Object)) {
      this.message.showMessage("Error", "Categoría Inválida");
      return false;
    }
    else {
      this.libro.id_categoria = this.categoria.id;
    }

    if(this.editorial == undefined || !(this.editorial instanceof Object)) {
      this.message.showMessage("Error", "Editorial Inválida");
      return false;
    }
    else {
      this.libro.id_editorial = this.editorial.id;
    }

    if(this.zona == undefined || !(this.zona instanceof Object)) {
      this.message.showMessage("Error", "Zona Inválida");
      return false;
    }
    else {
      this.libro.id_zona = this.zona.id;
    }

    return true;
  }

  searchCategoria = (text$: Observable<String>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.serviceCategoria.getByNombre(term)
      )
    );

  formatterCategoria = (c: Categoria) => c.nombre;

  searchEditorial = (text$: Observable<String>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.serviceEditorial.getByNombre(term)
      )
    );

  formatterEditorial = (c: Editorial) => c.nombre;

  searchZona = (text$: Observable<String>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.serviceZona.getByNombre(term)
      )
    );

  formatterZona = (c: Zona) => c.nombre;

  ngOnDestroy() {
    if(this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

}
