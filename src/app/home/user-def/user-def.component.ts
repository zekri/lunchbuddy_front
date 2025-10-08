import {Component, OnDestroy, OnInit} from '@angular/core';
import {SingletonService} from "../../singleton.service";
import {ActionRenderComponent} from "./action-render/action-render.component";
import {DeleteRenderComponent} from "./delete-render/delete-render.component";
import {ProfileService} from "../profile-def/profile.service";
import {Subscription} from "rxjs";
import {UserService} from "./user.service";
import * as moment from "moment";
import {StatusRenderComponent} from "../../shared/status-render/status-render.component";
import {Router} from "@angular/router";
import {DelteRenderComponent} from "../social-user/delte-render/delte-render.component";
import {ImageRenderComponent} from "../../shared/image-render/image-render.component";


@Component({
  selector: 'app-user-def',
  templateUrl: './user-def.component.html',
  styleUrls: ['./user-def.component.scss']
})
export class UserDefComponent implements OnInit,OnDestroy {
  loader = false;

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
  constructor(public singleton: SingletonService,
              private router: Router,
              private userService: UserService) {
    this.singleton.titleHeader = 'Users'
    const sub = this.singleton.actionObservable().subscribe((data:any) => {
      if (data.function === 'refresh'){
        this.loadUsersList();
      }
      if (data.function === 'deleteUser'){
        this.delete(data.data)
      }
    });
    this.subscription.push(sub);
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub: any) => sub.unsubscribe());

  }
  ngOnInit(): void {
    if(this.singleton.checkRole(40)){
      this.frameworkComponents = {
        ActionRenderComponent,
        DeleteRenderComponent,
        StatusRenderComponent
      };
      this.rowData= this.singleton.listUsers
      this.createGrid();
    }
    else{
      this.router.navigate(['']);
    }




  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

  }
  loadUsersList(): void {
    this.loader = true;
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
      this.rowData= this.singleton.listUsers
      this.createGrid();
      this.loader = false;
    })
  }

  delete(id: number): void {
    this.userService.deleteUser(id).subscribe((result:any)=>{
    this.loadUsersList();
    })
  }
  createGrid(): void {
    this.columnDefs = [
      this.singleton.checkRole(44) ?{
        field: 'id',
        headerComponent: 'DeleteRenderComponent',
        maxWidth: 40,
        cellRenderer: 'DeleteRenderComponent',
        pinned: 'left',
      } : {maxWidth: 0,},
      this.singleton.checkRole(41)  || this.singleton.checkRole(42) ?{
        field: 'id',
        headerComponent: 'ActionRenderComponent',
        maxWidth: 60,
        cellRenderer: 'ActionRenderComponent',
        pinned: 'left',
      }: {maxWidth: 0,},
      {
        field: 'login',
        headerName: 'Login',
        minWidth: 120,
        filter: 'agTextColumnFilter',
        cellClass: 'rowBold',
      },
      {
        field: 'firstName' ,
        headerName:'First name',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'lastName' ,
        headerName:'Last name',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'profileName' ,
        headerName:'Profile',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'email' ,
        headerName:'Email',
        minWidth: 120,
        filter: true,

      },

      {
        field: 'insertionDatelabel' ,
        headerName:'Creation Date',
        minWidth: 120,
        filter: true,

      },
      {
        field: 'active' ,
        headerName:'Active',
        maxWidth: 120,
        cellRenderer: 'StatusRenderComponent',
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


}
