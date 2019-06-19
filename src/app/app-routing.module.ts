import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {DemoComponent} from './demo/demo.component';
import {RegistrationComponent} from './registration/registration.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent,children:
    [
      {path:'reg',component:RegistrationComponent},
      {path:'dashbord',component:RegistrationComponent},
    ]
  },
  {path:'demo',component:DemoComponent},
  

  {path:'**',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
