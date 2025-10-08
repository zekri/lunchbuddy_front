import {Component, OnDestroy, OnInit} from '@angular/core';
import {SingletonService} from "../../singleton.service";
import {ProfileService} from "./profile.service";
import {ActionRenderComponent} from "./action-render/action-render.component";
import {DeleteRenderComponent} from "./delete-render/delete-render.component";
import {Subscription} from "rxjs";
import {StatusRenderComponent} from "../../shared/status-render/status-render.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-profile-def',
  templateUrl: './profile-def.component.html',
  styleUrls: ['./profile-def.component.scss']
})
export class ProfileDefComponent implements OnInit,OnDestroy {
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
              private profileService: ProfileService) {
    this.singleton.titleHeader = 'Profiles'
    const sub = this.singleton.actionObservable().subscribe((data:any) => {
      if (data.function === 'refresh'){
        this.singleton.listModules.forEach((module: any) => {
          module.checked = false
          module.listRoles.forEach((role: any) => {
            role.checked = false
          })

        })
        this.loadProfileLoist()
      }
      if (data.function === 'deleteProfile'){
          this.delete(data.data)
      }
    });
    this.subscription.push(sub);
  }

  delete(id: number): void{


    this.profileService.deleteProfile(id).subscribe((result: any) => {
      console.log(result)
      this.singleton.actionChange('refresh')

    })
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub: any) => sub.unsubscribe());

  }
  ngOnInit(): void {
    if(this.singleton.checkRole(45)){
      this.frameworkComponents = {
        ActionRenderComponent,
        DeleteRenderComponent,
        StatusRenderComponent
      };
      this.rowData =this.singleton.listProfiles
      this.createGrid()
    }
    else{
      this.router.navigate(['']);
    }


  }

  loadModuleRoleLoist(): void {
    this.loader= true;
    this.profileService.loadModulkeList().subscribe((data: any) => {
      console.log(data)
      this.singleton.listModules = data;

      this.loader =false;
    })
  }

  loadProfileLoist(): void {
    this.loader= true;
    this.profileService.loadProfileList().subscribe((data: any) => {
      console.log(data)
      this.singleton.listProfiles = data;
      this.rowData =this.singleton.listProfiles
      this.loader =false;
    })
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

  }

  createGrid(): void {
    this.columnDefs = [
      this.singleton.checkRole(48) ?  {
        field: 'id',
        headerComponent: 'DeleteRenderComponent',
        maxWidth: 40,
        cellRenderer: 'DeleteRenderComponent',
        pinned: 'left',
      } : { maxWidth: 0,},
      this.singleton.checkRole(46) ||  this.singleton.checkRole(47) ?{
        field: 'id',
        headerComponent: 'ActionRenderComponent',
        maxWidth: 60,
        cellRenderer: 'ActionRenderComponent',
        pinned: 'left',
      }: { maxWidth: 0,},
      {
        field: 'name',
        headerName: 'Name',
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
        field: 'active' ,
        headerName:'Active',
        maxWidth: 120,
        cellRenderer: 'StatusRenderComponent',
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
