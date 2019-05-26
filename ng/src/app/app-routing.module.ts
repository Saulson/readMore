import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColoniaComponent } from './components/colonia/colonia.component'
import { ColoniaDetailComponent } from './components/colonia-detail/colonia-detail.component';
import { EditorialComponent } from './components/editorial/editorial.component';
import { EditorialDetailComponent } from './components/editorial-detail/editorial-detail.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },

  { path: 'colonia', component: ColoniaComponent },
  { path: 'colonia-detail/:id', component: ColoniaDetailComponent },
  { path: 'colonia-detail', component: ColoniaDetailComponent },

  { path: 'editorial', component: EditorialComponent },
  { path: 'editorial-detail/:id', component: EditorialDetailComponent },
  { path: 'editorial-detail', component: EditorialDetailComponent },
  { path: 'index', component: IndexComponent},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
