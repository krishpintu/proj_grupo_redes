import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig} from '@angular/material';
import { DemoComponent } from '../demo/demo.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog :MatDialog) { }

  ngOnInit() {
    const config=new MatDialogConfig();
    config.disableClose=true;
    config.autoFocus=true;
    config.width="50%";
    this.dialog.open(DemoComponent,config);
  }

}
