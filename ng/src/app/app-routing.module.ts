import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutorComponent } from './components/autor/autor.component';
import { AutorDetailComponent } from './components/autor-detail/autor-detail.component';

import { CalleComponent } from './components/calle/calle.component';
import { CalleDetailComponent } from './components/calle-detail/calle-detail.component';

import { CategoriaComponent } from './components/categoria/categoria.component';
import { CategoriaDetailComponent } from './components/categoria-detail/categoria-detail.component';

import { ColoniaComponent } from './components/colonia/colonia.component'
import { ColoniaDetailComponent } from './components/colonia-detail/colonia-detail.component';

import { ConfiguracionComponent } from './components/configuracion/configuracion.component';

import { EditorialComponent } from './components/editorial/editorial.component';
import { EditorialDetailComponent } from './components/editorial-detail/editorial-detail.component';

import { EjemplarComponent } from './components/ejemplar/ejemplar.component';
import { EjemplarDetailComponent } from './components/ejemplar-detail/ejemplar-detail.component';

import { EstadoComponent } from './components/estado/estado.component';
import { EstadoDetailComponent } from './components/estado-detail/estado-detail.component';

import { GrupoPermisoComponent } from './components/grupo-permiso/grupo-permiso.component';
import { GrupoPermisoDetailComponent } from './components/grupo-permiso-detail/grupo-permiso-detail.component';

import { LibroComponent } from './components/libro/libro.component';
import { LibroDetailComponent } from './components/libro-detail/libro-detail.component';

import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';

import { ModificarPassComponent } from './components/modificar-pass/modificar-pass.component';

import { PersonaComponent } from './components/persona/persona.component';
import { PersonaDetailComponent } from './components/persona-detail/persona-detail.component';

import { PermisoComponent } from './components/permiso/permiso.component';
import { PermisoDetailComponent } from './components/permiso-detail/permiso-detail.component';

import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioDetailComponent } from './components/usuario-detail/usuario-detail.component';

import { ZonaComponent } from './components/zona/zona.component';
import { ZonaDetailComponent } from './components/zona-detail/zona-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },

  { path: 'autor', component: AutorComponent },
  { path: 'autor-detail/:id', component: AutorDetailComponent },
  { path: 'autor-detail', component: AutorDetailComponent },

  { path: 'calle', component: CalleComponent },
  { path: 'calle-detail/:id', component: CalleDetailComponent },
  { path: 'calle-detail', component: CalleDetailComponent },

  { path: 'categoria', component: CategoriaComponent },
  { path: 'categoria-detail/:id', component: CategoriaDetailComponent },
  { path: 'categoria-detail', component: CategoriaDetailComponent },

  { path: 'colonia', component: ColoniaComponent },
  { path: 'colonia-detail/:id', component: ColoniaDetailComponent },
  { path: 'colonia-detail', component: ColoniaDetailComponent },

  { path: 'configuracion', component: ConfiguracionComponent },

  { path: 'editorial', component: EditorialComponent },
  { path: 'editorial-detail/:id', component: EditorialDetailComponent },
  { path: 'editorial-detail', component: EditorialDetailComponent },

  { path: 'ejemplar', component: EjemplarComponent },
  { path: 'ejemplar-detail/:id', component: EjemplarDetailComponent },
  { path: 'ejemplar-detail', component: EjemplarDetailComponent },

  { path: 'estado', component: EstadoComponent },
  { path: 'estado-detail/:id', component: EstadoDetailComponent },
  { path: 'estado-detail', component: EstadoDetailComponent },

  { path: 'grupo permiso', component: GrupoPermisoComponent },
  { path: 'grupo permiso-detail/:id', component: GrupoPermisoDetailComponent },
  { path: 'grupo permiso-detail', component: GrupoPermisoDetailComponent },

  { path: 'libro', component: LibroComponent },
  { path: 'libro-detail/:id', component: LibroDetailComponent },
  { path: 'libro-detail', component: LibroDetailComponent },

  { path: 'index', component: IndexComponent},

  { path: 'login', component: LoginComponent },

  { path: 'modificar-pass/:id', component: ModificarPassComponent },

  { path: 'permiso', component: PermisoComponent },
  { path: 'permiso-detail/:id', component: PermisoDetailComponent },
  { path: 'permiso-detail', component: PermisoDetailComponent },

  { path: 'persona', component: PersonaComponent},
  { path: 'persona-detail/:id', component: PersonaDetailComponent },
  { path: 'persona-detail', component: PersonaDetailComponent },

  { path: 'usuario', component: UsuarioComponent },
  { path: 'usuario-detail/:id', component: UsuarioDetailComponent },
  { path: 'usuario-detail', component: UsuarioDetailComponent },

  { path: 'zona', component: ZonaComponent },
  { path: 'zona-detail/:id', component: ZonaDetailComponent },
  { path: 'zona-detail', component: ZonaDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
