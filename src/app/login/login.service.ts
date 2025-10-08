import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor(private http: HttpClient) {
  }

  userIsLoggedIn(): boolean {
    if (localStorage.getItem('IsLoggedIn')) {
      const connectedUser: any = this.getConnectedUser();
      if (connectedUser != null && connectedUser !== undefined) {
        return true;
      }
    }
    return false;
  }

  getConnectedUser(): any {
    const userLogin: any = localStorage.getItem('ngStorage-userLocale');
    return JSON.parse(userLogin);
  }

  login(params: any): any{
    return this.http.post<any>(environment.contextPath + 'user/login', params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }
}
