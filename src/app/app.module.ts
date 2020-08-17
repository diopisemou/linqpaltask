import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUserComponent } from './components/admin/list-user/list-user.component';
import { HomeComponent } from './components/home/home/home.component';
import { HomeRegisterComponent } from './components/home/home-register/home-register.component';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component';
import { ListAdminComponent } from './components/admin/list-admin/list-admin.component';
import { HomeDetailComponent } from './components/home/home-detail/home-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './shared/api.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SigninComponent } from './components/signin/signin/signin.component';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { ToolbarComponent } from './components/layouts/toolbar/toolbar.component';
import { HomeLayoutComponent } from './components/layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './components/layouts/login-layout/login-layout.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { NavigationComponent } from './components/layouts/navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    HomeComponent,
    HomeRegisterComponent,
    AdminRegisterComponent,
    ListAdminComponent,
    HomeDetailComponent,
    SigninComponent,
    ToolbarComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    AdminLayoutComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
