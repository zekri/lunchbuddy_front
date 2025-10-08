import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {SingletonService} from "../../singleton.service";
import {RestaurantService} from "../restaurant/restaurant.service";
import {CityService} from "../city/city.service";
import {ActionRenderComponent} from "./action-render/action-render.component";
import {DelteRenderComponent} from "./delte-render/delte-render.component";
import * as Leaflet from "leaflet";
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs";
import {SocialUserService} from "./social-user.service";
import {ImageRenderComponent} from "../../shared/image-render/image-render.component";
import {Router} from "@angular/router";
import {DeleteRenderComponent} from "../restaurant/delete-render/delete-render.component";

@Component({
  selector: 'app-social-user',
  templateUrl: './social-user.component.html',
  styleUrls: ['./social-user.component.scss']
})
export class SocialUserComponent implements OnInit,AfterViewInit, OnDestroy {
  map: any;

  lat = 22.3527234;
  lng = 114.1277;
  zoom = 11;
  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;
  autoGroupColumnDef: any;
  defaultColDef: any;
  rowSelection: any;
  rowGroupPanelShow: any;
  frameworkComponents: any;
  pivotPanelShow: any;
  rowData: any;
  loader = false;
  citiesList: any;
  mapInitialized = false;
  listMarkers: any[] = [];
  displayList: any[] = [];
  subscription: Subscription[] = [];

  constructor(private socialUserService: SocialUserService,
              private router: Router,
              private singleton: SingletonService) {
    const sub = this.singleton.actionObservable().subscribe((data: any) => {
      if (data.function === 'refresh') {
          this.getSocialUsersList()
      }
      if (data.function === 'addRestaurant') {

      }
      if (data.function === 'deleteRestaurant') {

      }
    });
    this.subscription.push(sub);
    this.singleton.titleHeader = 'Social Users'
  }

  deleteSocialUserItem(id: any): void {
    this.socialUserService.deleteRestaurant(id).subscribe((data: any) => {
      this.getSocialUsersList();
    })
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub: any) => sub.unsubscribe());

  }
  ngOnInit(): void {
    if(this.singleton.checkRole(54)){
      this.frameworkComponents = {
        ActionRenderComponent,
        DelteRenderComponent,
        ImageRenderComponent
      };

      this.singleton.listSocialUsers.forEach((item:any) => {
        item.txtInterest = ' '
        item.listInterest.forEach((interest: any) => {
          this.singleton.listInterests.forEach((itemC: any) => {
            itemC.listInterest.forEach((itemI: any) => {
              if(interest.idInterest === itemI.idInterest){
                item.txtInterest += itemI.name + ', '
                interest.name = itemI.name;
                interest.image = itemI.image;
              }
            })
          })
        })
        item.txtlookFor = ' '
        item.listLookFor.forEach((interest: any) => {
          this.singleton.listLookFors.forEach((itemC: any) => {
            itemC.listLookFor.forEach((itemI: any) => {
              if(interest.idLookFor === itemI.idLookFor){
                item.txtlookFor += itemI.name + ', ';
                interest.name = itemI.name;
                interest.image = itemI.image;
              }
            })
          })
        })
        item.txtlanguage = ' '
        item.listLanguage.forEach((interest: any) => {
          this.singleton.listLanguages.forEach((itemI: any) => {
              if(interest.idLanguage === itemI.idLanguage){
                item.txtlanguage += itemI.image + ', '
                interest.name = itemI.name;
                interest.image = itemI.image;
              }

          })
        })
        item.txtkitchen = ' '
        item.listKitchen.forEach((interest: any) => {
          this.singleton.listKitchens.forEach((itemI: any) => {
            if(interest.idKitchen === itemI.id){
              item.txtkitchen += itemI.name + ', '
              interest.name = itemI.name;
            }

          })
        })
        item.txtDietary = ' '
        item.listDietaries.forEach((interest: any) => {
          this.singleton.listDietaries.forEach((itemI: any) => {
            if(interest.idDietary === itemI.id){
              item.txtDietary += itemI.name + ', '
              interest.name = itemI.name;
            }

          })
        })

        this.singleton.listProfessionals.forEach((itemI: any) => {
          if(item.idTitle === itemI.idPreofessionCategory){
            item.nameTitle = itemI.name
          }
        })

      })
      this.rowData = this.singleton.listSocialUsers
      this.createGrid();
      this.singleton.listRestaurant.map((item:any) => {
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
    }
    else{
      this.router.navigate(['']);
    }

  }


  ngAfterViewInit(): void {


  }

  counter(i: number): any {
    return new Array(i);
  }

  callMarkerPop(marker: any): void {
    this.listMarkers.forEach((data: any) => {
      if (data.name === marker.name && data._latlng.lat === marker.lat && data._latlng.lng === marker.lng) {
        this.map.flyTo([marker.lat, marker.lng]);
        data.openPopup();
      }

    });

  }

  findCamping(name: any): void {
    this.displayList = []
    this.rowData.forEach((item: any) => {
      if (name.target.value === '') {
        this.displayList.push(item);

      } else if (item.name.toLowerCase().includes(name.target.value)) {
        this.displayList.push(item);
      }
    });
    this.displayList = this.displayList.sort((n1: any, n2: any) => {
      if (Number(n1.distance) > Number(n2.distance)) {
        return 1;
      }
      if (Number(n1.distance) < Number(n2.distance)) {
        return -1;
      }
      return 0;
    });
  }

  tabChanged($event: any): void {
    if (!this.mapInitialized)
      this.initMap()
    this.mapInitialized = true;
    setTimeout(() => this.refreshMap(), 500);

  }

  refreshMap(): void {
    if (this.listMarkers.length > 0) {
      this.listMarkers.forEach((m: any) => {
        this.map.removeLayer(m);
      });
    }
    this.rowData.forEach((item: any) => {
      const itemMarker: any = Leaflet.marker([item.lat, item.lng], {
        icon: Leaflet.icon({
          iconSize: [15, 26],
          iconAnchor: [7, 26],
          popupAnchor: [1, -18],
          iconUrl: 'assets/orangemaker.png',
        }),
        title: item.name,
      });
      itemMarker.name = item.name;
      // @ts-ignore
      itemMarker.bindPopup(this.makeCapitalPopup(item), {
        closeButton: false
      });
      itemMarker.addTo(this.map);
      this.listMarkers.push(itemMarker);
    });
  }

  makeCapitalPopup(data: any): string {
    let starts = '';
    let distance = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= data.rate) {
        starts = starts + '<img  src="assets/staractive.png"  style="width:10px; "/>';
      }
      if (i > data.rate) {
        starts = starts + '<img  src="assets/starnoactive.png" style="width:10px;"/>';

      }
    }

    if (data.distance > 0) {
      distance = '<div style="font-size: 12px;font-weight: bold ; float: right; margin-top: -10px">(' + data.distance + 'Km)</div>';

    }
    return '' +
      '<div style="font-weight: bold; font-size: 15px;">' + data.name + '</div>' +
      '<div style="font-size: 12px; float: left;font-weight: 500;">' + data.cityName + '</div>' +
      '<div style="width:200px; display: inline-block; line-height: 5px">' +
      '<div style="display: flex; flex-direction: row">' +

      starts +
      '</div>' +
      distance +
      '</div>';
  }

  private initMap(): void {

    this.map = Leaflet.map('map', {
      center: [this.lat, this.lng],
      zoom: 13
    });

    const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

  }



  getSocialUsersList(): void {
    this.loader = true;
    this.socialUserService.loadSocialUserList().subscribe((data: any) => {
      console.log(data)
      this.loader = false;
      data.map((item:any) => {
        item.privateGroup = item.listPrivateGroup.length
        item.restaurant = item.listRestaurant.length
        item.followers = item.listFollowers.length
        item.following = item.listFollowing.length
        item.listInterest.forEach((interest: any) => {
          item.txtInterest = ' '
          item.listInterest.forEach((interest: any) => {
            this.singleton.listInterests.forEach((itemC: any) => {
              itemC.listInterest.forEach((itemI: any) => {
                if(interest.idInterest === itemI.idInterest){
                  item.txtInterest += itemI.name + ', '
                  interest.name = itemI.name;
                  interest.image = itemI.image;
                }
              })
            })
          })
          item.txtlookFor = ' '
          item.listLookFor.forEach((interest: any) => {
            this.singleton.listLookFors.forEach((itemC: any) => {
              itemC.listLookFor.forEach((itemI: any) => {
                if(interest.idLookFor === itemI.idLookFor){
                  item.txtlookFor += itemI.name + ', '
                  interest.name = itemI.name;
                  interest.image = itemI.image;
                }
              })
            })
          })
          item.txtlanguage = ' '
          item.listLanguage.forEach((interest: any) => {
            this.singleton.listLanguages.forEach((itemI: any) => {
              if(interest.idLanguage === itemI.idLanguage){
                item.txtlanguage += itemI.image + ', '
                interest.name = itemI.name;
                interest.image = itemI.image;
              }

            })
          })
          item.txtkitchen = ' '
          item.listKitchen.forEach((interest: any) => {
            this.singleton.listKitchens.forEach((itemI: any) => {
              if(interest.idKitchen === itemI.id){
                item.txtkitchen += itemI.name + ', '
                interest.name = itemI.name;
              }

            })
          })
          item.txtDietary = ' '
          item.listDietaries.forEach((interest: any) => {
            this.singleton.listDietaries.forEach((itemI: any) => {
              if(interest.idDietary === itemI.id){
                item.txtDietary += itemI.name + ', '
                interest.name = itemI.name;
              }

            })
          })
          this.singleton.listProfessionals.forEach((itemI: any) => {
            if(item.idTitle === itemI.idPreofessionCategory){
              item.nameTitle = itemI.name
            }
          })
        })
        if(item.birthdate && item.birthdate.length > 0){
          let today:Date = new Date()
          let birthDate:string[] = item.birthdate.split('-');
          item.age = Number(today.getFullYear()) - Number(birthDate[0])
        }
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
      this.rowData = data;
      this.displayList = data;
      this.createGrid();
    })
  }

  createGrid(): void {
    this.columnDefs = [
      this.singleton.checkRole(55) ? {
        field: 'idRow',
        headerComponent: 'DelteRenderComponent',
        maxWidth: 40,
        cellRenderer: 'DelteRenderComponent',
        pinned: 'left',
      }: { maxWidth: 0,},
      this.singleton.checkRole(56) ?{
        field: 'idRow',
        headerComponent: 'ActionRenderComponent',
        maxWidth: 60,
        cellRenderer: 'ActionRenderComponent',
        pinned: 'left',
      } : { maxWidth: 0,},
      {
        field: 'picture',
        headerName: 'Picture',
        cellRenderer: 'ImageRenderComponent',
        maxWidth: 80,
        pinned: 'left',
       filter: false
      },
      {
        field: 'name',
        headerName: 'Name',
        pinned: 'left',
        filter: 'agTextColumnFilter',
        filterParams: {
          suppressAndOrCondition: true
        },
        cellClass: 'rowBold',
      },
      {
        field: 'social',
        headerName: 'Social',
        cellRenderer: 'ImageRenderComponent',
        maxWidth: 100,
        filter: true,

      },
      {
        field: 'email',
        headerName: 'Email',
        minWidth: 180,
        filter: true,
        cellClass: 'rowBold',

      },


      {
        field: 'age',
        headerName: 'Age',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'nameTitle',
        headerName: 'Title',
        minWidth: 120,
        filter: true,
        cellClass: 'rowBold',

      },
      {
        field: 'nationality',
        headerName: 'Nationality',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'txtlanguage',
        headerName: 'Language',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'txtkitchen',
        headerName: 'Kitchen',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'txtDietary',
        headerName: 'Dietaries',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'txtInterest',
        headerName: 'Interest',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'txtlookFor',
        headerName: 'LookFor',
        minWidth: 120,
        filter: true,

      },

      {
        field: 'following',
        headerName: 'Following',
        minWidth: 120,
        filter: true,
        cellClass: 'rowNumber'
      },
      {
        field: 'followers',
        headerName: 'Followers',
        minWidth: 120,
        filter: true,
        cellClass: 'rowNumber'
      },
      {
        field: 'privateGroup',
        headerName: 'Private Group',
        minWidth: 120,
        filter: true,
        cellClass: 'rowNumber'
      },

      {
        field: 'restaurant',
        headerName: 'Restaurant',
        minWidth: 120,
        filter: true,
        cellClass: 'rowNumber'

      },
      {
        field: 'description',
        headerName: 'Description',
        minWidth: 120,
        filter: true,

      },


    ];
    this.autoGroupColumnDef = {
      headerName: 'Group',
      minWidth: 170,
      filter: 'agTextColumnFilter',
      filterParams: {
        suppressAndOrCondition: true
      },
      field: 'name',
      valueGetter(params: any): any {
        if (params.node.group) {
          return params.node.key;
        } else {
          return params.data[params.colDef.field];
        }
      },
      headerCheckboxSelection: true,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {checkbox: true},
    };
    this.defaultColDef = {
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: false,
      resizable: true,
      flex: 1,
      minWidth: 100,
    };
    this.rowSelection = 'multiple';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
  }
}
