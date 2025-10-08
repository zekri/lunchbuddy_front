import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class EventService {


  constructor(private http: HttpClient) {
  }

  loadEvent(): Observable<any>{
    return this.http.get<any>( environment.contextPath + 'lunch/all/' );
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
