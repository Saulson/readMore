import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }  from '@angular/common/http';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app/app.component';
import { MessageComponent } from './components/message/message.component';
import { LoginComponent } from './components/login/login.component';
import { EditorialComponent } from './components/editorial/editorial.component';
import { EditorialDetailComponent } from './components/editorial-detail/editorial-detail.component';
import { IndexComponent } from './components/index/index.component';
import { ColoniaComponent } from './components/colonia/colonia.component';
import { ColoniaDetailComponent } from './components/colonia-detail/colonia-detail.component';
import { CalleComponent } from './components/calle/calle.component';
import { CalleDetailComponent } from './components/calle-detail/calle-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    LoginComponent,
    EditorialComponent,
    EditorialDetailComponent,
    IndexComponent,
    ColoniaComponent,
    ColoniaDetailComponent,
    CalleComponent,
    CalleDetailComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbDropdownModule,
    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
