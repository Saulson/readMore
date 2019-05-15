import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { EditorialComponent } from './components/editorial/editorial.component';
import { EditorialDetailComponent } from './components/editorial-detail/editorial-detail.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'editorial', component: EditorialComponent },
  { path: 'editorial-detail/:id', component: EditorialDetailComponent },
  { path: 'editorial-detail', component: EditorialDetailComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
