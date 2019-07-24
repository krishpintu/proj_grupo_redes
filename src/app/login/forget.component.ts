import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Router   } from '@angular/router';
import { DataService } from '../_services/dataservice.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {

  forgetFrmGrp : FormGroup;
  submitted :boolean=false;

  constructor(private fb: FormBuilder, private _router:Router, private _service : DataService,private toastr: ToastrService) { }

  ngOnInit() {

    this.forgetFrmGrp = this.fb.group({
      username :['',[Validators.required]],
      email :['',[Validators.required]]
    });
  }
  onForgetClick(){
    if(this.forgetFrmGrp.valid){
      this._service.forgotPassword(this.forgetFrmGrp.value).subscribe(res=>{
          this.toastr.success("Passsword Change link has been sent to your email id.",'Success');
          this._router.navigate(['/'],{skipLocationChange: true});
        },
        err =>{
            this.toastr.error("invalid detail!!!",'Error') ;
          }
      );
    }
  }

}
