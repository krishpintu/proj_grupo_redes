import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Router , ActivatedRoute  } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFrmGrp : FormGroup;
  submitted :boolean=false;
  returnUrl: string;

  constructor(private fb: FormBuilder, private _router:Router, private _route: ActivatedRoute,private _service: AuthenticationService) { 
    // redirect to home if already logged in
    if (this._service.currentUserValue) { 
        this._router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.loginFrmGrp = this.fb.group({
      usernameOrEmail :['',[Validators.required]],
      password :['',[Validators.required]]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/home';

  }
  onLoginClick(){
    if(this.loginFrmGrp.valid){
      this.submitted=true;
      let loginCredential =this.loginFrmGrp.value;
      this._service.login(loginCredential).subscribe( data => {
          this._router.navigate([this.returnUrl]);
      },
      err =>{
          this.submitted=false;
          console.log(err);
          alert('Invalid Credential');
        }
      );
    }
  }

}
