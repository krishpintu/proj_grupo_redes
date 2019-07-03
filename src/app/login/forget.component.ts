import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Router   } from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {

  forgetFrmGrp : FormGroup;
  submitted :boolean=false;

  constructor(private fb: FormBuilder, private _router:Router) { }

  ngOnInit() {

    this.forgetFrmGrp = this.fb.group({
      usernameOrEmail :['',[Validators.required]]
    });
  }
  onForgetClick(){

  }

}
