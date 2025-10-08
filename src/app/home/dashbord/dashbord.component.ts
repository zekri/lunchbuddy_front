import { Component, OnInit } from '@angular/core';
import {SingletonService} from "../../singleton.service";
import {CityService} from "../city/city.service";
import {RestaurantService} from "../restaurant/restaurant.service";
import {DifinitionService} from "../difinition/difinition.service";
import {SocialUserService} from "../social-user/social-user.service";
import {ProfileService} from "../profile-def/profile.service";
import {UserService} from "../user-def/user.service";
import * as moment from "moment";
import {environment} from "../../../environments/environment";
import {EventService} from "../event/event.service";

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  loader = false;
  constructor(public singleton: SingletonService,
              private cityService: CityService,
              private restaurantService: RestaurantService,
              private definitionService: DifinitionService,
              private socialUserService: SocialUserService,
              private eventService: EventService,
              private profileService: ProfileService,
              private userService: UserService
  ) {
    this.singleton.titleHeader = 'Dashbord'
  }

  ngOnInit(): void {
    this.getCountryList();
    this.getRestaurantList();
    this.getDietaryList();
    this.getCuisineList();
    this.getProfessionList();
    this.getLookForList();
    this.getInterestList();
    this.getLanguageList();
    this.loadModuleRoleLoist();
    this.getLunchList();
  }

  getCountryList(): void{
    this.loader = true;
    this.cityService.loadCountryList().subscribe((data: any) => {
      console.log(data)
      this.singleton.listCountry = data
      this.getCityList();
    })
  }

  getLunchList(): void{
    this.eventService.loadEvent().subscribe((data: any) => {
      console.log('lunch')
      console.log(data)
      data.forEach((itemU:any) => {
        // @ts-ignore
        itemU.eventDate = new moment(itemU.date).format('DD MMM yyyy, hh:mm')
      })
      this.singleton.listEvent = data

    })
  }

  getCityList(): void{
    this.cityService.loadCityList().subscribe((data: any) => {
      console.log(data)
      this.loader = false;
      data.map((item:any) => {
        item.nbrPosition = item.listAreas.length
        item.nbrRestaurant = item.listRestaurant.length
        this.singleton.listCountry.forEach((itemC:any) => {
          if(item.idCountry === itemC.id){
            item.countryName = itemC.name
          }
        })
        return item;
      })
      data = data.sort((n1: any, n2: any) => {
        if (n1.name > n2.name) {
          return 1;
        }
        if (n1.name < n2.name) {
          return -1;
        }
        return 0;
      });
      this.singleton.listCity = data;
      this.loader = false;
      this.getSocialUsersList();
    })
  }

  getSocialUsersList(): void {
    this.socialUserService.loadSocialUserList().subscribe((data: any) => {
      console.log(data)
      this.loader = false;
      data.map((item:any) => {
        item.privateGroup = item.listPrivateGroup.length
        item.restaurant = item.listRestaurant.length
        item.followers = item.listFollowers.length
        item.following = item.listFollowing.length
        if(item.birthdate && item.birthdate.length > 0){
          let today:Date = new Date()
          let birthDate:string[] = item.birthdate.split('-');
          item.age = Number(today.getFullYear()) - Number(birthDate[0])
        }
        this.singleton.listProfessionals.forEach((itemI: any) => {
          if(item.idTitle === itemI.idPreofessionCategory){
            item.nameTitle = itemI.name
          }
        })
      })
      data = data.sort((n1: any, n2: any) => {
        if (n1.idRow < n2.idRow) {
          return 1;
        }
        if (n1.idRow > n2.idRow) {
          return -1;
        }
        return 0;
      });
      this.singleton.listSocialUsers = data;

    })
  }

  getDietaryList(): void{
    this.definitionService.loadDiateryList().subscribe((data: any) => {
      console.log(data)
      this.loader = false;

      data = data.sort((n1: any, n2: any) => {
        if (n1.id > n2.id) {
          return 1;
        }
        if (n1.id < n2.id) {
          return -1;
        }
        return 0;
      });
      data.forEach((item:any) => {
        item.type='dietary';
      })
      this.singleton.listDietaries = data;

    })
  }

  getCuisineList(): void{
    this.definitionService.loadCuisinesList().subscribe((data: any) => {
      console.log(data)
      this.loader = false;

      data = data.sort((n1: any, n2: any) => {
        if (n1.id > n2.id) {
          return 1;
        }
        if (n1.id < n2.id) {
          return -1;
        }
        return 0;
      });
      data.forEach((item:any) => {
        item.type='cuisine';
      })
      this.singleton.listKitchens = data;
    })
  }

  getProfessionList(): void{
    this.definitionService.loadProfessionList().subscribe((data: any) => {
      console.log(data)
      this.loader = false;

      data = data.sort((n1: any, n2: any) => {
        if (n1.idPreofessionCategory > n2.idPreofessionCategory) {
          return 1;
        }
        if (n1.idPreofessionCategory < n2.idPreofessionCategory) {
          return -1;
        }
        return 0;
      });
      data.forEach((item:any) => {
        item.type='profession';
      })
      this.singleton.listProfessionals = data;
    })
  }

  getLookForList(): void{
    this.definitionService.loadLookForList().subscribe((data: any) => {
      console.log(data)
      this.loader = false;

      data = data.sort((n1: any, n2: any) => {
        if (n1.idLookFor > n2.idLookFor) {
          return 1;
        }
        if (n1.idLookFor < n2.idLookFor) {
          return -1;
        }
        return 0;
      });
      const listLookFor: any[] = [];
      data.forEach((item:any) => {
        item.type='categoriesLookFor';
        item.listLookFor.forEach((itemL:any) => {
          itemL.categoryName = item.name;
          itemL.type='lookFor';
          listLookFor.push(itemL);
        })
      })
      this.singleton.listLookFors = data;
    })
  }

  getInterestList(): void{
    this.definitionService.loadInterestList().subscribe((data: any) => {
      console.log(data)
      this.loader = false;

      data = data.sort((n1: any, n2: any) => {
        if (n1.idInterestCategory > n2.idInterestCategory) {
          return 1;
        }
        if (n1.idInterestCategory < n2.idInterestCategory) {
          return -1;
        }
        return 0;
      });
      const listInterest: any[] = [];
      data.forEach((item:any) => {
        item.type='categoriesInterest';
        item.listInterest.forEach((itemL:any) => {
          itemL.categoryName = item.name;
          itemL.type='interest';
          listInterest.push(itemL);
        })
      })
      this.singleton.listInterests = data;

    })
  }

  getLanguageList(): void{
    this.definitionService.loadLanguagesList().subscribe((data: any) => {
      console.log(data)
      this.loader = false;

      data = data.sort((n1: any, n2: any) => {
        if (n1.idLanguage > n2.idLanguage) {
          return 1;
        }
        if (n1.idLanguage < n2.idLanguage) {
          return -1;
        }
        return 0;
      });
      data.forEach((item:any) => {
        item.type='language';
      })
      this.singleton.listLanguages = data;
    })
  }

  loadModuleRoleLoist(): void {
    this.profileService.loadModulkeList().subscribe((data: any) => {

      this.singleton.listModules = data;
      this.loadProfileLoist()

    })
  }

  loadProfileLoist(): void {
    this.profileService.loadProfileList().subscribe((data: any) => {
      this.singleton.listProfiles = data;
      data.forEach((item: any) => {
        if(item.id === this.singleton.me.idProfile){
          this.singleton.me.profileName = item.name
          item.listModules.forEach((itemM: any) => {
            this.singleton.listRole.push(itemM.idRole)
          })
        }
      })
      this.loadUsersList();
    })
  }

  loadUsersList(): void {
    this.userService.loadUsersList().subscribe((result:any)=>{
      result.forEach((itemU:any) => {
        // @ts-ignore
        itemU.insertionDatelabel = new moment(itemU.insertionDate).format('DD MMM yyyy')
        this.singleton.listProfiles.forEach((itemP:any) => {
          if(itemU.idProfile === itemP.id){
            itemU.profileName = itemP.name;
          }
        })
      })
      this.singleton.listUsers = result;
    })
  }

  getRestaurantList(): void{
    this.loader = true;
    this.restaurantService.loadRestaurantList().subscribe((data: any) => {
      console.log(data)
      this.loader = false;
      data.map((item:any) => {
        item.imagePath = environment.contextPath + item.image
        item.reviews = item.listReviews.length
        item.photos = item.listPhotos.length

        item.listPhotos.forEach((itemR:any) => {
          itemR.urlPath = environment.contextPath + itemR.url
        })
        this.singleton.listCity.forEach((itemC:any) => {
          if(item.idCity === itemC.id){
            item.cityName = itemC.name
            item.rateEmoji = '⭐' +item.rate  ;
            itemC.listAreas.forEach((itemA:any) => {
              if(item.idArea === itemA.id) {
                item.areaName = itemA.name
              }
            })
          }
        })
        return item
      })
      data = data.sort((n1: any, n2: any) => {
        if (n1.name > n2.name) {
          return 1;
        }
        if (n1.name < n2.name) {
          return -1;
        }
        return 0;
      });

      this.singleton.listRestaurant = data;

    })
  }
}
