import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DemoComponent>) { }

  ngOnInit() {

  }
  onCancel(){
    this.dialogRef.close();
  }
}
