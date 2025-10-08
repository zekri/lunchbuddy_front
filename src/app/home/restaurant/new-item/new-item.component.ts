import { Component, OnInit } from '@angular/core';
import {RestaurantService} from "../restaurant.service";
import {SingletonService} from "../../../singleton.service";
import {ItemRenderActionComponent} from "./item-render-action/item-render-action.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {
  loader = false;
  title = 'Add Restaurant';
  textSearch='';
  selectedType = '1';
  selectedCountry = '1';
  selectedCity = '' ;
  selectedArea = '' ;
  listArea : any[]= []
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
  subscription: Subscription[] = [];
  constructor(private restaurantService: RestaurantService,
              public singleton: SingletonService, ) {
    const sub = this.singleton.actionObservable().subscribe((data:any) => {
      if (data.function === 'updateRestaurant'){
        this.rowData.forEach((item:any) => {
          item.exist = false;
          this.singleton.listRestaurant.forEach((itemR: any) => {
            if (item.lat === itemR.lat && item.lng === item.lng) {
              item.exist = true;
            }

          })
        })
        this.areaChange()
        this.loader = false;
      }
      if (data.function === 'addingRestaurant'){
        this.loader = true;
      }
    });
    this.subscription.push(sub);
    this.selectedCity = '' + this.singleton.listCity[0].id;
    this.listArea = this.singleton.listCity[0].listAreas;
    if(this.singleton.listCity[0].listAreas.length > 0){
      this.selectedArea = '' + this.singleton.listCity[0].listAreas[0].id
    }else{
      this.selectedArea = ''
    }

  }

  ngOnInit(): void {
    this.frameworkComponents = {
      ItemRenderActionComponent,
    };
    this.rowData = [];
    this.createGrid();
  }

  cityChange(event: any): void {
    this.singleton.listCity.forEach((item: any) => {
      if(item.id === Number(event.value)){
        this.listArea = item.listAreas;
        if(item.listAreas.length > 0){
          this.selectedArea = '' + item.listAreas[0].id
        }else{
          this.selectedArea = ''
        }

      }
    })
    this.areaChange()
  }
  areaChange() : void{
    this.rowData.forEach((item: any) => {
      if(!item.exist){
        item.idCity = Number(this.selectedCity)
        item.idArea = Number(this.selectedArea)
      }
    })
    this.gridApi.setRowData(this.rowData)
  }

  findRestaurant(): void {
    this.loader = true;
    let typeName = 'restaurant'
    this.restaurantService.findFromGoogleApi(this.textSearch, typeName, 'HongKong').subscribe((data: any) => {
      data.forEach((item:any) =>{
        item.exist = false;
        this.singleton.listRestaurant.forEach((itemR:any) =>{
          if(item.lat === itemR.lat && item.lng === item.lng){
            item.exist = true;
          }

        })
      })
     this.rowData = data;
      this.areaChange()
      this.loader = false;
    })
  }
  createGrid(): void {
    this.columnDefs = [
      {
        field: 'id',
        headerName: '',
        maxWidth: 70,
        cellRenderer: 'ItemRenderActionComponent',
      },
       {
        field: 'name',
        headerName: 'Name',
        filter: 'agTextColumnFilter',
        filterParams: {
          suppressAndOrCondition: true
        }
        },
      {
        field: 'vicinity' ,
        headerName:'Address',
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

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

  }

}
