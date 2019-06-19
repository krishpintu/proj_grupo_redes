import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  isLinear= false;
  constructor(private _formBuilder: FormBuilder,public dialogRef: MatDialogRef<DemoComponent>) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      
    });
    this.secondFormGroup = this._formBuilder.group({
     
    });
  }
  onCancel(){
    this.dialogRef.close();
  }
}
