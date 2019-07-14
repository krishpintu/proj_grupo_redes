import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './_modules/material';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo/demo.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegViewComponent } from './registration/reg-view.component';
import { ForgetComponent } from './login/forget.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DemoComponent,
    RegistrationComponent,
    DashboardComponent,
    RegViewComponent,
    ForgetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
