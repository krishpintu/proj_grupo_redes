import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    })
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl="http://189.1.102.246:8080/grupo-redes-services/api";
  
  

  constructor(private http: HttpClient) {
  }

  validateCEP(cep:string) {
    this.apiUrl="https://axa4xlbon6.execute-api.sa-east-1.amazonaws.com/stage/cep/?cep=";//05364190
    return this.http.get<any>(`${this.apiUrl}${cep}`);
  }


  

}
