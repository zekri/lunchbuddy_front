import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CityService} from "./city.service";
import {RestaurantService} from "../restaurant/restaurant.service";

import * as Leaflet from "leaflet";
import {ActionRenderComponent} from "./action-render/action-render.component";
import {DeleteRenderComponent} from "./delete-render/delete-render.component";
import {SingletonService} from "../../singleton.service";
import {Subscription} from "rxjs";
import {ItemCityComponent} from "./item-city/item-city.component";
import {MatDialog} from "@angular/material/dialog";
import {ItemAreaComponent} from "./item-area/item-area.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit,AfterViewInit, OnDestroy  {
  map: any;
  lat =  22.3527234;
  lng = 114.1277;
  zoom = 11;
  indexTab = 0;
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
  allchecked = false;
  countryList: any;
  mapInitialized = false;
  listMarkers: any[] = [];
  listCircle: any[] = [];
  displayList: any[] = [];
  subscription: Subscription[] = [];
  constructor(private cityService: CityService,
              private matdialog: MatDialog,
              private router: Router,
              private restaurantService:RestaurantService,
              public singleton: SingletonService) {
    const sub = this.singleton.actionObservable().subscribe((data:any) => {
      if (data.function === 'refresh'){
        this.getCityList();
      }
      if (data.function === 'deleteCity'){
        this.deleteCity(data.data);
      }
    });
    this.subscription.push(sub);
    this.singleton.titleHeader = 'Cities'
  }

  ngOnInit(): void {
    if(this.singleton.checkRole(4)){
      this.frameworkComponents = {
        ActionRenderComponent,
        DeleteRenderComponent
      };
     this.rowData =  this.singleton.listCity;
      this.displayList=  this.singleton.listCity;
     this.createGrid();
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
    this.indexTab = $event.index

  }

  refreshMap(): void {

    if(this.listMarkers.length > 0) {
      this.listMarkers.forEach((m: any) => {
        this.map.removeLayer(m);
      });
    }
    if(this.listCircle.length > 0) {
      this.listCircle.forEach((m: any) => {
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
      const itemCircle: any =Leaflet.circle([item.lat, item.lng], item.radius).addTo(this.map);
      this.listMarkers.push(itemMarker);
      this.listCircle.push(itemCircle);
      item.listAreas.forEach((area: any) => {
        const itemMarker: any = Leaflet.marker([area.lat, area.lng], {
          icon: Leaflet.icon({
            iconSize: [15, 26],
            iconAnchor: [7, 26],
            popupAnchor: [1, -18],
            iconUrl: 'assets/orangemaker.png',
          }),
          title: area.name,
        });
        itemMarker.name = area.name;
        // @ts-ignore
        itemMarker.bindPopup(this.makeAreaCapitalPopup(area,item), {
          closeButton: false
        });
        itemMarker.addTo(this.map);
        const itemCircle: any =Leaflet.circle([area.lat, area.lng], area.radius).addTo(this.map);
        this.listMarkers.push(itemMarker);
        this.listCircle.push(itemCircle);
      })
    });
  }

  makeCapitalPopup(data: any): string {
    let starts = '';
    let distance = '';


    if(data.distance > 0){
      distance = '<div style="font-size: 12px;font-weight: bold ; float: right; margin-top: -10px">(' + data.distance + 'Km)</div>';

    }
    return '' +
      '<div style="font-weight: bold; font-size: 15px;">' + data.name + '</div>' +
      '<div style="font-size: 12px; float: left;font-weight: 500;">' + data.countryName + '</div>' +
      '<div style="width:200px; display: inline-block; line-height: 5px">' +
      '<div style="display: flex; flex-direction: row">' +


      distance +
      '</div>';
  }

  makeAreaCapitalPopup(data: any, item:any): string {
    let starts = '';
    let distance = '';


    if(data.distance > 0){
      distance = '<div style="font-size: 12px;font-weight: bold ; float: right; margin-top: -10px">(' + data.distance + 'Km)</div>';

    }
    return '' +
      '<div style="font-weight: bold; font-size: 15px;">' + data.name + '</div>' +
      '<div style="font-size: 12px; float: left;font-weight: 500;">' + item.name + '</div>' +
      '<div style="width:200px; display: inline-block; line-height: 5px">' +
      '<div style="display: flex; flex-direction: row">' +


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

  getCountryList(): void{
    this.cityService.loadCountryList().subscribe((data: any) => {
      console.log(data)
      this.countryList = data
      this.getCityList();
    })
  }

  deleteCity(id: any): void{
    this.cityService.deleteCity(id).subscribe((data: any) => {
      this.getCityList();
    })
  }

  getCityList(): void{
    this.loader = true;
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
      this.rowData = data;
      this.displayList = data;
      this.createGrid();
      if(this.indexTab === 1 ){
        this.refreshMap()
      }
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
        field: 'name',
        headerName: 'Name',
        minWidth: 120,
        filter: 'agTextColumnFilter',
        cellClass: 'rowBold',
        },

      {
        field: 'countryName' ,
        headerName:'Country',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'nbrPosition' ,
        headerName:'Areas',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'nbrRestaurant' ,
        headerName:'Restaurant',
        minWidth: 120,
        filter: true,

      }





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

  ngOnDestroy(): void {
    this.subscription.forEach((sub: any) => sub.unsubscribe());

  }

  runGoogleApi() :void {
    this.singleton.runGoogleApi = true;
    const listArea: any[] = [];
    this.singleton.listCity.forEach((item:any)=> {
      item.listAreas.map((area:any) => {
        if(area.checked){
          listArea.push(area)
        }
      })
    })
    this.restaurantService.updateFromGoogleApi(listArea).subscribe((data: any) => {
      this.singleton.runGoogleApi = false;
    })

  }

  setAll(event: any) {
    this.allchecked = event.checked
    this.singleton.listCity.map((item:any)=> {
      item.checked =  event.checked
      item.listAreas.map((area:any) => {
        area.checked =  event.checked
        return area
      })
      return item
    })
    console.log(this.singleton.listCity)
  }

  setAllCity(event: any, id: any) {
    this.singleton.listCity.map((item:any)=> {
     if(item.id === id){
       item.checked =  event.checked
       item.listAreas.map((area:any) => {
         area.checked =  event.checked
         return area
       })
     }

      return item
    })
  }

  checkCities(): boolean {
    let state = false
    this.singleton.listCity.forEach((item:any)=> {
      if(item.checked) {
        state = true
      }
        item.listAreas.forEach((area:any) => {
          if(area.checked) {
            state = true
          }
        })
    })
    return state
  }

  addArea(): void{

    this.matdialog.open(ItemAreaComponent, {data: {item: {lat:this.map.getCenter().lat, lng:this.map.getCenter().lng }}}).afterClosed().subscribe(update => {
      if(update){
        this.singleton.actionChange('refresh')
      }

    });
  }
}

