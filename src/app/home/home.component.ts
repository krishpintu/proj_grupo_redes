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

  constructor(private dialog :MatDialog,private _router :Router,private _service :AuthenticationService ) { }

  ngOnInit() {
    const config=new MatDialogConfig();
    config.disableClose=true;
    config.autoFocus=true;
    config.width="50%";
    this.dialog.open(DemoComponent,config);
  }
  onLogout(){
    this._service.logout();
    this._router.navigate(['/']);
  }

}
