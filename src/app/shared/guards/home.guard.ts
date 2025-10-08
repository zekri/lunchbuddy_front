import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {LoginService} from "../../login/login.service";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class AppWebGuard implements CanActivateChild {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginService.userIsLoggedIn()) {
      return true;
    }
    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
