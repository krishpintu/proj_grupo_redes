import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFrmGrp : FormGroup;
  constructor(private fb: FormBuilder, private _router:Router) { }

  ngOnInit() {
    this.loginFrmGrp = this.fb.group({
      usernameOrEmail :['',[Validators.required]],
      password :['',[Validators.required]]
    });
  }

}
