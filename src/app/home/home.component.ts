import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig} from '@angular/material';
import { DemoComponent } from '../demo/demo.component';
import { Router } from '@angular/router';
import { AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  isDemoUser:boolean=true;
  
  constructor(private dialog :MatDialog,private _router :Router,private _service :AuthenticationService ) { 
    
    const config=new MatDialogConfig();
    config.disableClose=true;
    config.autoFocus=true;
    config.width="50%";
    this.dialog.open(DemoComponent,config);

    //check for demo user
    this._service.demoUser.subscribe(res=>{this.isDemoUser=res});
    console.log(this.isDemoUser);
  }

  ngOnInit() {
    
  }
  onLogout(){
    this._service.logout();
    this._router.navigate(['/']);
  }

}
