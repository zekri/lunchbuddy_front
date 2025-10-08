import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RestaurantService} from "./restaurant.service";
import {CityService} from "../city/city.service";
import * as Leaflet from 'leaflet';
import {ActionRenderComponent} from "./action-render/action-render.component";
import {DeleteRenderComponent} from "./delete-render/delete-render.component";
import {environment} from "../../../environments/environment";
import {SingletonService} from "../../singleton.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ImageRenderComponent} from "../../shared/image-render/image-render.component";


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit,AfterViewInit,OnDestroy  {
  map: any;

  lat =  22.3527234;
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
  constructor(private restaurantService: RestaurantService,
              private router: Router,
              public singleton: SingletonService,
              private cityService: CityService) {
    const sub = this.singleton.actionObservable().subscribe((data:any) => {
      if (data.function === 'refresh'){
        this.getRestaurantList();
      }
      if (data.function === 'addRestaurant'){
        this.addRestaurantItem(data.data);
      }
      if (data.function === 'deleteRestaurant'){
        this.deleteRestaurantItem(data.data);
      }
    });
    this.subscription.push(sub);
    this.singleton.titleHeader = 'Restaurants'
  }

  deleteRestaurantItem(id: any): void {
    this.restaurantService.deleteRestaurant(id).subscribe((data: any) => {
      this.getCityList();
    })
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub: any) => sub.unsubscribe());

  }

  ngOnInit(): void {
    if(this.singleton.checkRole(14)){
      this.frameworkComponents = {
        ActionRenderComponent,
        DeleteRenderComponent,
        ImageRenderComponent
      };
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
      this.rowData =  this.singleton.listRestaurant;
      this.displayList=  this.singleton.listRestaurant;
      this.createGrid();
    }
    else{
      this.router.navigate(['']);
    }

  }

  addRestaurantItem(prams: any): void {
    this.restaurantService.saveRestaurant(prams).subscribe((data: any) => {
      this.getRestaurantList();
    })
  }

  ngAfterViewInit(): void {


  }

  counter(i: number): any {
    return new Array(i);
  }

  callMarkerPop(marker: any): void{
    this.listMarkers.forEach((data: any) => {
      if(data.name === marker.name && data._latlng.lat === marker.lat && data._latlng.lng === marker.lng){
        this.map.flyTo([marker.lat, marker.lng]);
        data.openPopup();
      }

    });

  }

  findCamping(name: any): void{
    this.displayList = []
    this.rowData.forEach((item: any) => {
      if(name.target.value === ''){
          this.displayList.push(item);

      }
      else if(item.name.toLowerCase().includes(name.target.value)) {
        this.displayList.push(item);
      }
    });
    this.displayList = this.displayList.sort((n1: any, n2: any) => {
      if (Number(n1.distance)> Number(n2.distance)) {
        return 1;
      }
      if (Number(n1.distance) < Number(n2.distance)) {
        return -1;
      }
      return 0;
    });
  }

  tabChanged($event: any): void{
    if(!this.mapInitialized)
      this.initMap()
    this.mapInitialized = true;
    setTimeout(() => this.refreshMap(), 500);

  }

  refreshMap(): void {
    if(this.listMarkers.length > 0) {
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
      if(i <= data.rate){
        starts = starts + '<img  src="assets/staractive.png"  style="width:10px; "/>';
      }
      if(i > data.rate){
        starts = starts +  '<img  src="assets/starnoactive.png" style="width:10px;"/>';

      }
    }

    if(data.distance > 0){
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
      center: [ this.lat, this.lng ],
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

  getCityList(): void{
    this.cityService.loadCityList().subscribe((data: any) => {
      console.log(data)
      this.citiesList = data
      this.singleton.listCity = data;
      this.getRestaurantList();
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
      this.rowData = data;
      this.singleton.listRestaurant = data;
      this.singleton.actionChange('updateRestaurant')
      this.displayList = data;
      this.createGrid();
    })
  }

  createGrid(): void {
    this.columnDefs = [
      {
        field: 'id',
        headerComponent: 'DeleteRenderComponent',
        maxWidth: 40,
        cellRenderer: 'DeleteRenderComponent',
        pinned: 'left',
      },
      {
        field: 'id',
        headerComponent: 'ActionRenderComponent',
        maxWidth: 60,
        cellRenderer: 'ActionRenderComponent',
        pinned: 'left',
      },
      {
        field: 'imagePath',
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
        cellClass: 'rowBold'
      },
      {
        field: 'rateEmoji' ,
        headerName:'Rate',
        maxWidth: 80,
        filter: true,
        pinned: 'left',

      },

      {
        field: 'lat' ,
        headerName:'Lat',
        minWidth: 120,
        filter: true,
        cellClass: 'rowNumber'

      },
      {
        field: 'lng' ,
        headerName:'Lng',
        minWidth: 120,
        filter: true,
        cellClass: 'rowNumber'

      },
      {
        field: 'cityName' ,
        headerName:'City',
        minWidth: 120,
        filter: true,
        cellClass: 'rowBold'
      },
      {
        field: 'areaName' ,
        headerName:'Area',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'phone' ,
        headerName:'Phone',
        minWidth: 150,
        filter: true,
        cellClass: 'rowNumber'

      },
      {
        field: 'vicinity' ,
        headerName:'Address',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'website' ,
        headerName:'Website',
        minWidth: 250,
        filter: true,

      },
      {
        field: 'weekday_text' ,
        headerName:'Week Time',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'photos' ,
        headerName:'Photos',
        minWidth: 120,
        filter: true,
        cellClass: 'rowNumber'

      },
      {
        field: 'reviews' ,
        headerName:'Reviews',
        minWidth: 120,
        filter: true,
        cellClass: 'rowNumber'

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
