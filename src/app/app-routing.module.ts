import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {DemoComponent} from './demo/demo.component';
import {RegistrationComponent} from './registration/registration.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './_helpers/auth.guard';
import {RegViewComponent} from './registration/reg-view.component';
import {ForgetComponent} from './login/forget.component';

const routes: Routes = [
  {path:'',component:LoginComponent,pathMatch: 'full'},
  {path:'forget',component:ForgetComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard],runGuardsAndResolvers:'always',children:
    [
      {path:'reg',component:RegistrationComponent},
      {path:'dashbord',component:DashboardComponent},
    ]
  },
  {path:'demo',component:DemoComponent},
  {path:'reg',component:RegViewComponent},
  {path:'**',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
