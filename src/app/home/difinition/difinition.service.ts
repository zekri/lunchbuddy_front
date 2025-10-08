import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SingletonService} from "../../singleton.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class DifinitionService {


  constructor(private http: HttpClient,
              private singleton: SingletonService) {
  }

  loadDiateryList(): Observable<any>{
    return this.http.get<any>( environment.contextPath + 'dietary/all/' );
  }
  loadCuisinesList(): Observable<any>{
    return this.http.get<any>( environment.contextPath + 'kitchen/all/' );
  }

  loadLookForList(): Observable<any>{
    return this.http.get<any>( environment.contextPath + 'lookfor/categories/all/' );
  }



  loadInterestList(): Observable<any>{
    return this.http.get<any>( environment.contextPath + 'interest/categories/all/' );
  }

  loadLanguagesList(): Observable<any>{
    return this.http.get<any>( environment.contextPath + 'common/language/all/' );
  }

  loadProfessionList(): Observable<any>{
    return this.http.get<any>( environment.contextPath + 'profession/categories/all/' );
  }

  saveLookForCategory(params: any): any{
    return this.http.post<any>(environment.contextPath + 'lookfor/categories', params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  saveLookFor(params: any): any{
    return this.http.post<any>(environment.contextPath + 'lookfor', params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  saveInterestCategory(params: any): any{
    return this.http.post<any>(environment.contextPath + 'interest/categories', params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }
  saveLanguage(params: any): any{
    return this.http.post<any>(environment.contextPath + 'common/language', params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  saveProfession(params: any): any{
    return this.http.post<any>(environment.contextPath + 'profession/categories', params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  saveCuisine(params: any): any{
    return this.http.post<any>(environment.contextPath + 'kitchen', params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  saveDietary(params: any): any{
    return this.http.post<any>(environment.contextPath + 'dietary', params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }


  saveInterest(params: any): any{
    return this.http.post<any>(environment.contextPath + 'interest', params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  deleteInterestCategory(params: any): any{
    return this.http.delete<any>(environment.contextPath + 'interest/categories?id=' +params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  deleteInterest(params: any): any{
    return this.http.delete<any>(environment.contextPath + 'interest/item?id=' +params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  deleteLookForCategory(params: any): any{
    return this.http.delete<any>(environment.contextPath + 'lookfor/categories?id=' +params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  deleteLookFor(params: any): any{
    return this.http.delete<any>(environment.contextPath + 'lookfor/item?id=' +params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  deleteLanguage(params: any): any{
    return this.http.delete<any>(environment.contextPath + 'common/language?id=' +params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  deleteProfession(params: any): any{
    return this.http.delete<any>(environment.contextPath + 'profession/categories?id=' +params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  deleteCuisine(params: any): any{
    return this.http.delete<any>(environment.contextPath + 'kitchen?id=' +params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }

  deleteDietary(params: any): any{
    return this.http.delete<any>(environment.contextPath + 'dietary?id=' +params,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}});
  }


}
