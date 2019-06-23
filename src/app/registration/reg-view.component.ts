import { Component, OnInit ,Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-reg-view',
  templateUrl: './reg-view.component.html',
  styleUrls: ['./reg-view.component.scss']
})
export class RegViewComponent implements OnInit {

  compData:object;
  constructor(public dialogRef: MatDialogRef<RegViewComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    //this.compData=data;
    //console.log(data);
  }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
