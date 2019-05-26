import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { EditorialComponent } from './components/editorial/editorial.component';
import { EditorialDetailComponent } from './components/editorial-detail/editorial-detail.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent},
  { path: 'login', component: LoginComponent },
  { path: 'editorial', component: EditorialComponent },
  { path: 'editorial-detail/:id', component: EditorialDetailComponent },
  { path: 'editorial-detail', component: EditorialDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
