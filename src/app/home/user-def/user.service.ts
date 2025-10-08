import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {


  constructor(private http: HttpClient) {
  }



  loadUsersList(): Observable<any>{
    return this.http.get<any>( environment.contextPath + 'user/all/' );
  }

  saveUser(params: any): any{
    return this.http.post<any>(environment.contextPath + 'user', params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }




  deleteUser(params: any): any{
    return this.http.delete<any>(environment.contextPath + 'user?id=' +params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }




}
