import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
export class AuthenticationService {

  apiUrl="http://189.1.102.246:8080/grupo-redes-services/api";
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public demoUser= new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }
   
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(userCredential) {
    return this.http.post<any>(`${this.apiUrl}/auth/signin`,userCredential,httpOptions)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', user.accessToken);
        this.currentUserSubject.next(user.accessToken);
        this.demoUser.next(false);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  loginDemoUser() {
    return this.http.post<any>(`${this.apiUrl}/auth/signin`,{"usernameOrEmail":"djswastik2001@gmail.com","password":"demo12345"},httpOptions)
      .pipe(map(user => {
        localStorage.setItem('currentUser', user.accessToken);
        return user;
      }));
  }
  
}
