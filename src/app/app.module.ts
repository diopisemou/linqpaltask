import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUserComponent } from './components/admin/list-user/list-user.component';
import { HomeComponent } from './components/home/home/home.component';
import { HomeRegisterComponent } from './components/home/home-register/home-register.component';
import { HomeDetailComponent } from './components/home/home-detail/home-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './shared/api.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SigninComponent } from './components/signin/signin/signin.component';
import { AuthInterceptor } from './shared/authconfig.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    HomeComponent,
    HomeRegisterComponent,
    HomeDetailComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
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
