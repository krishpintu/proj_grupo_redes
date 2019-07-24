import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

    constructor(private _router: Router,private _authService: AuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this._authService.currentUserValue;
        
        if (currentUser || state.url=="/home/reg") {
            //console.log(currentUser);
            if(currentUser==null){
                this._authService.demoUser.next(true);
                this._authService.loginDemoUser().subscribe(res=>console.log(res));
            }
            return true;
        }
        // not logged in so redirect to login page with the return url
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}