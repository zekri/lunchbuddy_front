import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActionRenderComponent} from "../action-render/action-render.component";
import {DeleteRenderComponent} from "../delete-render/delete-render.component";
import {ActionRenderItemComponent} from "../action-render-item/action-render-item.component";
import {InputRenderComponent} from "../input-render/input-render.component";
import {SingletonService} from "../../../singleton.service";
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CityService} from "../city.service";

@Component({
  selector: 'app-item-city',
  templateUrl: './item-city.component.html',
  styleUrls: ['./item-city.component.scss']
})
export class ItemCityComponent implements OnInit, OnDestroy {
  loader = false;
  title = 'Add/Edit City';
  selectedCity: any;
  frameworkComponents: any;
  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;

  autoGroupColumnDef: any;
  defaultColDef: any;
  rowSelection: any;
  rowGroupPanelShow: any;
  pivotPanelShow: any;
  rowAllData: any;
  rowData: any;
  subscription: Subscription[] = [];
  constructor(public singleton: SingletonService,
              private cityService: CityService,
              public dialogRef: MatDialogRef<ItemCityComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { item: any },) {

    const sub = this.singleton.actionObservable().subscribe((data:any) => {
    if (data.function === 'addArea'){
      const obj: any = {
        name:'',
        radius:'',
        idCity: this.selectedCity.item,
        lat:'',
        lng:'',
      }
     this.singleton.listAreaByCity.push(obj)
      this.gridApi.setRowData( this.singleton.listAreaByCity)
    }
    if (data.function === 'deleteArea'){
      this.singleton.listAreaByCity.splice(data.data,1)
      this.gridApi.setRowData(  this.singleton.listAreaByCity)

    }

  });
    this.subscription.push(sub);
    this.singleton.listAreaByCity = []
    if(data.item && data.item !== -1){
      this.singleton.listCity.forEach((item:any)=> {
        if(item.id === data.item){
          this.selectedCity = {
            id: item.id,
            name:item.name,
            radius:item.radius,
            idCountry: item.idCountry,
            lat:item.lat,
            lng:item.lng,
          }
          if(item.listAreas)
          this.singleton.listAreaByCity = item.listAreas
        }
      })
    }else{
      this.selectedCity = {
        id:null,
        name:'',
        radius:'',
        idCountry:1,
        lat:'',
        lng:'',
      }

    }

  }

  ngOnInit(): void {
    this.frameworkComponents = {
      ActionRenderItemComponent,
      InputRenderComponent
    };

  }
  preview(): void{
  this.dialogRef.close()
  }

  checkData(): boolean {
    let state = false;
    if(this.selectedCity.name.length >0
    && this.selectedCity.lat.toString().length >0
      && this.selectedCity.lng.toString().length >0 && this.selectedCity.radius
      && this.selectedCity.radius.toString().length >0){
      state = true;
      if( this.singleton.listAreaByCity){
        this.singleton.listAreaByCity.forEach((item:any)=> {
          if(item.name.length ===0
            || item.lat.toString().length ===0
            || item.lng.toString().length ===0
            || item.radius.toString().length ===0){
            state= false;
          }
        })
      }

    }
    return  state;
  }

  save(): void{
    console.log(this.selectedCity)
    if(this.checkData()){
      this.cityService.saveCity(this.selectedCity).subscribe((data:any) => {
        console.log(data)
        this.dialogRef.close(true);
      })
    }

  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.createGrid();
   this.rowData =  this.singleton.listAreaByCity;
  }

  createGrid(): void {
    this.columnDefs = [
      {
        field: 'id',
        headerComponent: 'ActionRenderItemComponent',
        maxWidth: 60,
        cellRenderer: 'ActionRenderItemComponent',
        pinned: 'left',
      },
      {
        field: 'name',
        headerName: 'Area Name',
        cellRenderer: 'InputRenderComponent',
        minWidth: 400,
        filter: 'agTextColumnFilter',
      },

      {
        field: 'lat' ,
        headerName:'Laltitude',
        cellRenderer: 'InputRenderComponent',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'lng' ,
        headerName:'Longitude',
        cellRenderer: 'InputRenderComponent',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'radius' ,
        headerName:'radius',
        cellRenderer: 'InputRenderComponent',
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

}
