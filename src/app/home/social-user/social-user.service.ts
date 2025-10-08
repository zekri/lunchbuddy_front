import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";


@Injectable({ providedIn: 'root' })
export class SocialUserService {


  constructor(private http: HttpClient) {
  }

  loadSocialUserList(): Observable<any>{
    return this.http.get<any>( environment.contextPath + 'social/all/' );
  }




  deleteRestaurant(params: any): any{
    return this.http.delete<any>(environment.contextPath + 'restaurant/item?id=' +params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  saveRestaurant(params: any): any{
    return this.http.post<any>(environment.contextPath + 'restaurant/item', params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }


}
