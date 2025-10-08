import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProfileService {


  constructor(private http: HttpClient) {
  }

  loadModulkeList(): Observable<any>{
    return this.http.get<any>( environment.contextPath + 'moduleroles/all/' );
  }

  loadProfileList(): Observable<any>{
    return this.http.get<any>( environment.contextPath + 'profile/all/' );
  }

  saveProfile(params: any): any{
    return this.http.post<any>(environment.contextPath + 'profile', params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }




  deleteProfile(params: any): any{
    return this.http.delete<any>(environment.contextPath + 'profile?id=' +params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }



}
