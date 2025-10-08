import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";


@Injectable({ providedIn: 'root' })
export class RestaurantService {


  constructor(private http: HttpClient) {
  }

  loadRestaurantList(): Observable<any>{
    return this.http.get<any>( environment.contextPath + 'restaurant/all/' );
  }

  updateFromGoogleApi(params: any): any{
    return this.http.post<any>(environment.contextPath + 'restaurant/setbyarea', params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  findFromGoogleApi(txtSearch: string, type: string, countryName: string): any{
    let params : any  = {
      txtSearch: txtSearch,
      type: type,
      countryName : countryName
    }
    return this.http.get<any>(environment.contextPath + 'restaurant/find?txtSearch=' +txtSearch + '&type='+type+'&countryName='+countryName,
{headers: {'Content-Type': 'application/json;charset=UTF-8'}});
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
