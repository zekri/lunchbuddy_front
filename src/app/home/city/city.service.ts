import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {SingletonService} from "../../singleton.service";


@Injectable({ providedIn: 'root' })
export class CityService {


  constructor(private http: HttpClient,
              private singleton: SingletonService) {
  }

  loadCityList(): Observable<any>{
    return this.http.get<any>( environment.contextPath + 'cities/all/' );
  }

  saveCity(params: any): any{
    params.listAreas = this.singleton.listAreaByCity
    return this.http.post<any>(environment.contextPath + 'cities', params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  saveArea(params: any): any{
    return this.http.post<any>(environment.contextPath + 'areas', params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  deleteCity(params: any): any{
    return this.http.delete<any>(environment.contextPath + 'cities?id=' +params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  loadCountryList(): Observable<any>{
    return this.http.get<any>( environment.contextPath + 'countries/all/' );
  }


}
