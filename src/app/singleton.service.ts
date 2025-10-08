import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SingletonService {

  observaleFilter: BehaviorSubject<any> = new BehaviorSubject([]);


  runGoogleApi = false;
  titleHeader=''
  listCity:any[] = [];
  listRestaurant:any[] = [];
  listAreaByCity:any[] = [];
  listSocialUsers:any[] = [];
  listKitchens:any[] = [];
  listDietaries:any[] = [];
  listLookFors:any[] = [];
  listInterests:any[] = [];
  listProfessionals:any[] = [];
  listLanguages:any[] = [];
  listModules: any[] = [];
  listProfiles: any[] = [];
  listUsers: any[] = [];
  listRole:number[] = [];
  listCountry: any[] = [];
  listEvent: any[] = [];
  me: any = {}

  actionChange(functionName: string, value?: any ): void {
    this.observaleFilter.next({function: functionName, data: value});
  }

  actionObservable(): Observable<any> {
    return this.observaleFilter.asObservable();
  }

  checkRole(value: number): boolean {
    // @ts-ignore
    let exist = false;
    if (this.listRole.length > 0) {
      this.listRole.forEach((r: number) => {
        if (r === value) {
          exist = true;
        }
      });
    }
    return exist;
  }

}
