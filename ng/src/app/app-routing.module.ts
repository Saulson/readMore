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

import { EditorialComponent } from './components/editorial/editorial.component';
import { EditorialDetailComponent } from './components/editorial-detail/editorial-detail.component';

import { GrupoPermisoComponent } from './components/grupo-permiso/grupo-permiso.component';
import { GrupoPermisoDetailComponent } from './components/grupo-permiso-detail/grupo-permiso-detail.component';

import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';

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

  { path: 'editorial', component: EditorialComponent },
  { path: 'editorial-detail/:id', component: EditorialDetailComponent },
  { path: 'editorial-detail', component: EditorialDetailComponent },

  { path: 'grupo permiso', component: GrupoPermisoComponent },
  { path: 'grupo permiso-detail/:id', component: GrupoPermisoDetailComponent },
  { path: 'grupo permiso-detail', component: GrupoPermisoDetailComponent },

  { path: 'index', component: IndexComponent},

  { path: 'login', component: LoginComponent },

  { path: 'zona', component: ZonaComponent },
  { path: 'zona-detail/:id', component: ZonaDetailComponent },
  { path: 'zona-detail', component: ZonaDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
