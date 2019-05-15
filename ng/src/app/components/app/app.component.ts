import { Component, OnInit } from '@angular/core';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = '';

  constructor(private service: AppService) {}

  ngOnInit() {
    this.getName();
  }

  getName(): void {
    this.service.getName().subscribe( data => {
      if (data.status == 200) {
        this.name = data.data.nombre;
      }
    })
  }

  /*<input type='file' accept="image/jpeg,image/jpg,image/png" (change)='openFile($event)'/>
  openFile(event) {
    let input = event.target;
    let reader = new FileReader();
    reader.onload = () => {
        var text = reader.result;
        miobj = btoa(text)
    }
    
    reader.readAsBinaryString(event.target.files[0]);
    
  }*/
}
