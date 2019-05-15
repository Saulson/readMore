import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }  from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app/app.component';
import { MessageComponent } from './components/message/message.component';
import { LoginComponent } from './components/login/login.component';
import { EditorialComponent } from './components/editorial/editorial.component';
import { EditorialDetailComponent } from './components/editorial-detail/editorial-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    LoginComponent,
    EditorialComponent,
    EditorialDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
