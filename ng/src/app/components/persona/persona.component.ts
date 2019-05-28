import { Component, OnInit } from '@angular/core';

import { Persona } from '../../models/persona';

import { MessageService } from '../../services/message.service';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {

  private personas: Persona[];
  private totalItems: number;
  private limit: number;
  private page: number;
  private previousPage: number;

  constructor(private service: PersonaService) { }

  ngOnInit() {
    this.initPagination();
  }

  private initPagination(): void {
    this.totalItems = 0;
    this.page = this.previousPage = 1;
    this.limit = 20;

    this.service.getNumRecord().subscribe(data => {
      if(data.status == 200) {
        this.totalItems = data.data.count;
        this.getPersonas();
      }
    })
  }

  public changePage(page: number) {
    if(page !== this.previousPage) {
      this.previousPage = page;
      this.getPersonas();
    }
  }

  private getPersonas(): void {
    this.service.get(this.limit, this.page, ['id', 'nombre']).subscribe(data => {
      if(data.status == 200) {
        this.personas = data.data;
      }
    });
  }

  public delete(persona: Persona):void {
    this.service.delete(persona.id).subscribe(data => {
      if(data.status == 200) {
        this.initPagination();
      }
    });
  }

}
