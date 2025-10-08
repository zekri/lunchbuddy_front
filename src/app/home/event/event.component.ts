import { Component, OnInit } from '@angular/core';
import {SingletonService} from "../../singleton.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {LunchTypeComponent} from "../../shared/lunch-type/lunch-type.component";
import {DeleteRenderComponent} from "./delete-render/delete-render.component";
import {ActionRenderComponent} from "./action-render/action-render.component";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
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
  constructor(private singleton: SingletonService,
              private router: Router,) {

    this.singleton.titleHeader = 'Events'
  }

  ngOnInit(): void {
    if(this.singleton.checkRole(49)){
      this.frameworkComponents = {
        LunchTypeComponent,
        DeleteRenderComponent,
        ActionRenderComponent
      };
      this.singleton.listEvent.forEach((itemC: any) => {
        itemC.nbrJoin = itemC.listJoin.length;
      this.singleton.listRestaurant.forEach((itemI: any) => {
          if(itemC.idRestaurant === itemI.id){
            itemC.restaurant = itemI
          }
        })

      this.singleton.listSocialUsers.forEach((itemI: any) => {
        if(itemC.idUser === itemI.idRow){
          itemC.user = itemI
        }
      })
    })
      this.singleton.listEvent = this.singleton.listEvent.sort((n1: any, n2: any) => {
        if (n1.date < n2.date) {
          return 1;
        }
        if (n1.date > n2.date) {
          return -1;
        }
        return 0;
      });
      this.rowData =  this.singleton.listEvent;

      this.createGrid();
    }
    else{
      this.router.navigate(['']);
    }
  }

  createGrid(): void {
    this.columnDefs = [
      this.singleton.checkRole(53) ?  {
        field: 'id',
        headerComponent: 'DeleteRenderComponent',
        maxWidth: 40,
        cellRenderer: 'DeleteRenderComponent',
        pinned: 'left',
      } :{ maxWidth: 0,},
      this.singleton.checkRole(51) ?{
        field: 'id',
        headerComponent: 'ActionRenderComponent',
        maxWidth: 60,
        cellRenderer: 'ActionRenderComponent',
        pinned: 'left',
      } : { maxWidth: 0,},
      {
        field: 'status' ,
        headerName:'Type',
        cellRenderer: 'LunchTypeComponent',
        maxWidth: 40,
        filter: true,

      },
      {
        field: 'eventDate' ,
        headerName:'Date',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'title',
        headerName: 'Title',
        minWidth: 120,
        filter: 'agTextColumnFilter',
        cellClass: 'rowBold',
      },

      {
        field: 'description' ,
        headerName:'Description',
        minWidth: 120,
        filter: true,

      },

      {
        field: 'user.name' ,
        headerName:'user',
        minWidth: 120,
        filter: true,

      }
      ,
      {
        field: 'restaurant.name' ,
        headerName:'restaurant',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'nbrJoin' ,
        headerName:'Membre',
        minWidth: 120,
        filter: true,

      }
      ,




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
