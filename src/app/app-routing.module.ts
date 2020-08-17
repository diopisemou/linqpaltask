import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './components/admin/list-user/list-user.component';
import { HomeComponent } from './components/home/home/home.component';
import { HomeRegisterComponent } from './components/home/home-register/home-register.component';
import { HomeDetailComponent } from './components/home/home-detail/home-detail.component';
import { AuthGuard } from "./shared/auth.guard";
import { SigninComponent } from './components/signin/signin/signin.component';
import { HomeLayoutComponent } from './components/layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './components/layouts/login-layout/login-layout.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component';
import { ListAdminComponent } from './components/admin/list-admin/list-admin.component';



const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'log-in', component: LoginLayoutComponent,
    children: [
      {path: '', component: SigninComponent}
    ]
  },
  { path: 'main', component: HomeLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'register', component: HomeRegisterComponent }
    ]
  },
  { path: 'admin', component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
      { path: 'list-user', component: ListUserComponent, canActivate: [AuthGuard] },
      { path: 'list-admin', component: ListAdminComponent, canActivate: [AuthGuard] },
      { path: 'add-admin', component: AdminRegisterComponent, canActivate: [AuthGuard] },
      { path: 'detail-user/:id', component: HomeDetailComponent, canActivate: [AuthGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
