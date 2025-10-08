import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {LoginService} from "../../login/login.service";
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivateChild {

  constructor(private router: Router, private loginService: LoginService) {
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginService.userIsLoggedIn()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
