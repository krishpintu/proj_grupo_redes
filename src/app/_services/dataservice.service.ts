import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl="http://189.1.102.246:8080/grupo-redes-services/api";
  
  constructor(private http: HttpClient) {
  }

  validateCEP(cep:string) {
    let cepurl="https://axa4xlbon6.execute-api.sa-east-1.amazonaws.com/stage/cep/?cep=";//05364190
    return this.http.get<any>(`${cepurl}${cep}`);
  }

  registration(regData){
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('currentUser')}`
        })
    }
    return this.http.post<any>(`${this.apiUrl}/lead/create-multiple-at-once`,regData,httpOptions);
  }

  getLeads(){
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('currentUser')}`
        })
    }
    return this.http.post<any>(`${this.apiUrl}/lead/groups`,{"type":"UNKNOWN"},httpOptions);
  }
  getLeadDetail(id){
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('currentUser')}`
        })
    }
    return this.http.get<any>(`${this.apiUrl}/lead/in-group/viabilidade-report/${id}`,httpOptions);
  }
  
  forgotPassword(usrData){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<any>(`${this.apiUrl}/auth/forgot-pswd`,usrData,httpOptions);

  }

}
