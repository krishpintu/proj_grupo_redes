import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DataService } from '../_services/dataservice.service';
import { RegistrationModel } from '../model/registration';
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService} from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr'; 


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('stepper') private myStepper: MatStepper;
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  items: FormArray;
  isAddition: boolean = false;
  isProgress: boolean = true;
  invalidCEP: boolean = false;

  result:object;

  public _model: RegistrationModel;

  constructor(private _fb: FormBuilder, private _dataservie: DataService,private _router :Router,private _service :AuthenticationService,private toastr: ToastrService) { 
    this._model = new RegistrationModel();
  }

  ngOnInit() {

    this.firstFormGroup = this._fb.group({
      opt_type: ['LINK_DEDICADO', Validators.required],
      address_list: this._fb.array([this.addAddress()]),
      mappedProduct:['', Validators.required],
      fiber: [''],
      radio: ['']
    });
    
    this.secondFormGroup = this._fb.group({
      officialName: ['', Validators.required],
      uniqueKey: ['', Validators.required],
      emailAddress: ['', Validators.required],
      contactNumber: ['', Validators.required],
      cep: [''],
      address: [''],
      streetno: [''],
      contato: [''],
    });
  }

  addAddress(): FormGroup {
    return this._fb.group({
      address: ['', Validators.required],
      city: [''],
      state: [''],
      country: ['BRAZIL'],
      complemento: [''],
      zipCode: ['', Validators.required],
      streetNumber: [''],
      cep: ['', Validators.required],
    });
  }

  addNewAddress(): void {
    this.items = this.firstFormGroup.get('address_list') as FormArray;
    this.items.push(this.addAddress()); // (<FormArray>this.firstFormGroup.get('address_list')).push(this.addAddress());
  }

  delAddress(index): void {
    this.items.removeAt(index);
  }

  onTypeChnage(): void {
    const optType = this.firstFormGroup.get('opt_type').value;
    this.items = this.firstFormGroup.get('address_list') as FormArray;
    this.isAddition = false;
    if ((optType == 'LINK_DEDICADO' || optType == 'BANDA_LARGA') && (this.items.length > 1)) {
      for (let i = 0; i < this.items.length; i++)
        this.items.removeAt(i);
    }
    if (optType == 'LAN_TO_LAN') {
      if (this.items.length == 1) {
        this.addNewAddress();
      } else {
        for (let i = 1; i < this.items.length; i++)
          this.items.removeAt(i);
      }
      
    }
    else if (optType == 'METRO_ETHERNET') {
      this.isAddition = true;
      if (this.items.length < 3) {
        for (let i = this.items.length; i < 3; i++)
          this.addNewAddress();
      }
    }

  }

  getCEPData(index): void {
    this.invalidCEP=false;
    const fgcontrols = (<FormGroup>this.firstFormGroup.controls['address_list']);
    const cep = fgcontrols.controls[index].get('zipCode').value;
    //working this.firstFormGroup.value.address_list[id].address = 'New Value';
    if (cep.trim() != "") {
      const add = fgcontrols.controls[index].get('address');
      add.setValue('Carregando.....');
      this._dataservie.validateCEP(cep).subscribe(res => {
        if (res.bairro != null) {
          add.setValue(`${res.end} , ${res.bairro}`);
          fgcontrols.controls[index].get('city').setValue(res.cidade);
          fgcontrols.controls[index].get('state').setValue(res.uf);
          fgcontrols.controls[index].get('cep').setValue(res.cep);

          if(index==0){
            this.secondFormGroup.get('cep').setValue(res.cep);
            this.secondFormGroup.get('address').setValue(`${res.end} , ${res.bairro}`);
         }

        } else {
          this.toastr.warning("CEP não encontrado !!!",'Warning') ;
          add.setValue('');
          this.invalidCEP=true;
          
        }
      }
      );
    }
  }

  mapProduct(){

    const optType = this.firstFormGroup.get('opt_type').value;
    let products=optType;
    if(this.firstFormGroup.get('fiber').value==true){
      products=`${products},RADIO`;
    }
    if(this.firstFormGroup.get('radio').value==true){
      products=`${products},FIBRA_OTICA`;
    }
    if(this.firstFormGroup.get('fiber').value==true || this.firstFormGroup.get('radio').value==true){
      this.firstFormGroup.get('mappedProduct').setValue(products);
    }else{
      this.firstFormGroup.get('mappedProduct').setValue('');
    }
    
  }

  onFinish(stepper: MatStepper) {

    this.validateAllFormFields(this.secondFormGroup);

    if(this.secondFormGroup.valid){
      this.isProgress=true;
      this.mapProduct();
      let frm1data=this.firstFormGroup.value;
      let data=this.secondFormGroup.value;
      
      this._model.uniqueKey=data['uniqueKey'];
      this._model.officialName=data['officialName'];
      this._model.casualName=data['officialName'];
      this._model.contactNumber=data['contactNumber'];
      this._model.emailAddress=data['emailAddress'];
      this._model.address=frm1data['address_list'];
      this._model.selectedProduct=frm1data['mappedProduct'];
      this._model.mappedProduct=frm1data['mappedProduct'];

      stepper.next();
      this._dataservie.registration(this._model).subscribe(res => {
        //console.log(res);
        this.result=res;
        this.isProgress=false;
        
      },
      err=>{
       // console.log(err);
        this.toastr.error(err.error.message,'Error') ;
        if(err.error.error=="Unauthorized"){
          this._service.logout();
          this._router.navigate(['/']);
        }

      }
      );
  
    }
    else{
      this.toastr.error("Preenche todos os campos obrigatorios!!!",'Error') ;
    }
    
 }
 
//validate event fired for all the field 
 validateAllFormFields(formGroup: FormGroup) {         
  Object.keys(formGroup.controls).forEach(field => {  
    const control = formGroup.get(field);             
    if (control instanceof FormControl) {            
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {       
      this.validateAllFormFields(control);            
    }
  });
}

}