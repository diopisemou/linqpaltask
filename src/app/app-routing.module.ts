import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './components/admin/list-user/list-user.component';
import { HomeComponent } from './components/home/home/home.component';
import { HomeRegisterComponent } from './components/home/home-register/home-register.component';
import { HomeDetailComponent } from './components/home/home-detail/home-detail.component';
import { AuthGuard } from "./shared/auth.guard";
import { SigninComponent } from './components/signin/signin/signin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-student' },
  { path: 'admin/list-user', component: ListUserComponent, canActivate: [AuthGuard] },
  { path: 'admin/add-user', component: HomeRegisterComponent, canActivate: [AuthGuard] },
  { path: 'admin/detail-user/:id', component: HomeDetailComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'home/register', component: HomeRegisterComponent },
  { path: 'log-in', component: SigninComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
