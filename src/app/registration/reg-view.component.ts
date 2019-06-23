import { Component, OnInit ,Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DataService} from '../_services/dataservice.service';
import { Router } from '@angular/router';
import { AuthenticationService} from '../_services/authentication.service';

export class leadData {
  officialName: string="Krishna";
  casualName: string;
  uniqueKey: string;
  operationArea: string;
  contactNumber: string;
  emailAddress: string;
  status: string;
  foBasedViabilidadeByDistance: number;
  radioBasedViabilidadeByDistance: number;
  address:object;
  leadGroup:object= {name: "",type: "",status: ""};
  selectedProduct: string;
  mappedProduct: string;
}

@Component({
  selector: 'app-reg-view',
  templateUrl: './reg-view.component.html',
  styleUrls: ['./reg-view.component.scss']
})
export class RegViewComponent implements OnInit {

  isLoading :boolean=true;
  public _model:leadData;

  constructor(public dialogRef: MatDialogRef<RegViewComponent>, @Inject(MAT_DIALOG_DATA) data,private _dataService:DataService,private _router :Router,private _service :AuthenticationService) { 
    this._model = new leadData();
    this.leadDetails(data);
    
  }

  ngOnInit() {
  }

  leadDetails(id){

    this.isLoading=true;
    
    this._dataService.getLeadDetail(id).subscribe(res=>{
      //console.log(res);
      this.isLoading=false;
      this._model=res;
    },
    err=>{
       alert(err.error.message);
       if(err.error.error=="Unauthorized"){
         this._service.logout();
         this._router.navigate(['/']);
       }
       this.isLoading=false;
      }
    );
  }
  closeDialog(){
    this.dialogRef.close();
  }

}
