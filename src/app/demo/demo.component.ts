import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DemoComponent>,private _router :Router) { }

  ngOnInit() {

  }
  onCancel(){
    this.dialogRef.close();
    this._router.navigate(['/home/reg'],{skipLocationChange: true});

  }
}
