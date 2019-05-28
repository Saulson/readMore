import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }  from '@angular/common/http';
import { NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

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
import { GrupoPermisoComponent } from './components/grupo-permiso/grupo-permiso.component';
import { GrupoPermisoDetailComponent } from './components/grupo-permiso-detail/grupo-permiso-detail.component';
import { ZonaComponent } from './components/zona/zona.component';
import { ZonaDetailComponent } from './components/zona-detail/zona-detail.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CategoriaDetailComponent } from './components/categoria-detail/categoria-detail.component';
import { AutorComponent } from './components/autor/autor.component';
import { AutorDetailComponent } from './components/autor-detail/autor-detail.component';
import { EstadoComponent } from './components/estado/estado.component';
import { EstadoDetailComponent } from './components/estado-detail/estado-detail.component';
import { PermisoComponent } from './components/permiso/permiso.component';
import { PermisoDetailComponent } from './components/permiso-detail/permiso-detail.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { PersonaComponent } from './components/persona/persona.component';
import { PersonaDetailComponent } from './components/persona-detail/persona-detail.component';

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
    CalleDetailComponent,
    GrupoPermisoComponent,
    GrupoPermisoDetailComponent,
    ZonaComponent,
    ZonaDetailComponent,
    CategoriaComponent,
    CategoriaDetailComponent,
    AutorComponent,
    AutorDetailComponent,
    EstadoComponent,
    EstadoDetailComponent,
    PermisoComponent,
    PermisoDetailComponent,
    ConfiguracionComponent,
    PersonaComponent,
    PersonaDetailComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
