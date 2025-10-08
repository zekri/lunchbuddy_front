import {Component, Inject, OnInit} from '@angular/core';
import {SingletonService} from "../../../singleton.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActionRenderComponent} from "../action-render/action-render.component";
import {DelteRenderComponent} from "../delte-render/delte-render.component";
import {ImageRenderComponent} from "../../../shared/image-render/image-render.component";

@Component({
  selector: 'app-item-social-user',
  templateUrl: './item-social-user.component.html',
  styleUrls: ['./item-social-user.component.scss']
})
export class ItemSocialUserComponent implements OnInit {
  loader = false;
  title = 'View social user';
  selectedSocialUser: any;
  map: any;
  listRestaurant : any[] = []
  listFollowers : any[] = []
  listFollowing : any[] = []
  listReviews : any[] = []

  gridApiRestaurant: any;
  gridColumnApiRestaurant: any;
  columnDefsRestaurant: any;
  autoGroupColumnDefRestaurant: any;
  defaultColDefRestaurant: any;
  rowSelectionRestaurant: any;
  rowGroupPanelShowRestaurant: any;
  frameworkComponentsRestaurant: any;
  pivotPanelShowRestaurant: any;
  rowDataRestaurant: any;

  gridApiFollowers: any;
  gridColumnApiFollowers: any;
  columnDefsFollowers: any;
  autoGroupColumnDefFollowers: any;
  defaultColDefFollowers: any;
  rowSelectionFollowers: any;
  rowGroupPanelShowFollowers: any;
  frameworkComponentsFollowers: any;
  pivotPanelShowFollowers: any;
  rowDataFollowers: any;

  gridApiFollowing: any;
  gridColumnApiFollowing: any;
  columnDefsFollowing: any;
  autoGroupColumnDefFollowing: any;
  defaultColDefFollowing: any;
  rowSelectionFollowing: any;
  rowGroupPanelShowFollowing: any;
  frameworkComponentsFollowing: any;
  pivotPanelShowFollowing: any;
  rowDataFollowing: any;

  gridApiReviews: any;
  gridColumnApiReviews: any;
  columnDefsReviews: any;
  autoGroupColumnDefReviews: any;
  defaultColDefReviews: any;
  rowSelectionReviews: any;
  rowGroupPanelShowReviews: any;
  frameworkComponentsReviews: any;
  pivotPanelShowReviews: any;
  rowDataReviews: any;
  constructor( public singleton: SingletonService,
               public dialogRef: MatDialogRef<ItemSocialUserComponent>,
               @Inject(MAT_DIALOG_DATA) public data: { item: any },) {
    this.selectedSocialUser = data.item;
    this.title = 'Socail user: ' + this.selectedSocialUser.name
    this.selectedSocialUser.listRestaurant.forEach((interest: any) => {
      this.singleton.listRestaurant.forEach((itemI: any) => {
        if(interest.idRestaurant === itemI.id){
          this.listRestaurant.push(itemI) ;
        }

      })
    })
    this.selectedSocialUser.listFollowers.forEach((interest: any) => {
      this.singleton.listSocialUsers.forEach((itemI: any) => {
        if(interest.idUser === itemI.idRow){
          this.listFollowers.push(itemI) ;
        }

      })
    })
    this.selectedSocialUser.listFollowing.forEach((interest: any) => {
      this.singleton.listSocialUsers.forEach((itemI: any) => {
        if(interest.idFollow === itemI.idRow){
          this.listFollowing.push(itemI) ;
        }

      })
    })

  }

  ngOnInit(): void {
    this.frameworkComponentsRestaurant = {
      ImageRenderComponent
    };
    this.frameworkComponentsFollowers = {
      ImageRenderComponent
    };
    this.frameworkComponentsFollowing = {
      ImageRenderComponent
    };
    this.rowDataRestaurant = this.listRestaurant;
    this.createGridRestaurant();
    this.rowDataFollowers = this.listFollowers;
    this.createGridFollowers();
    this.rowDataFollowing = this.listFollowing;
    this.createGridFollowing()
  }

  onGridReadyRestaurant(params: any): void {
    this.gridApiRestaurant = params.api;
    this.gridColumnApiRestaurant = params.columnApi;

  }

  createGridRestaurant(): void {
    this.columnDefsRestaurant = [
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
        field: 'vicinity' ,
        headerName:'Address',
        minWidth: 120,
        filter: true,

      },





    ];
    this.autoGroupColumnDefRestaurant = {
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
    this.defaultColDefRestaurant = {
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: false,
      resizable: true,
      flex: 1,
      minWidth: 100,
    };
    this.rowSelectionRestaurant = 'multiple';
    this.rowGroupPanelShowRestaurant = 'always';
    this.pivotPanelShowRestaurant = 'always';
  }


  onGridReadyFollowers(params: any): void {
    this.gridApiFollowers = params.api;
    this.gridColumnApiFollowers = params.columnApi;

  }

  createGridFollowers(): void {
    this.columnDefsFollowers = [
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
        field: 'description',
        headerName: 'Description',
        minWidth: 120,
        filter: true,

      },


    ];
    this.autoGroupColumnDefFollowers = {
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
    this.defaultColDefFollowers = {
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: false,
      resizable: true,
      flex: 1,
      minWidth: 100,
    };
    this.rowSelectionFollowers = 'multiple';
    this.rowGroupPanelShowFollowers = 'always';
    this.pivotPanelShowFollowers = 'always';
  }

  onGridReadyFollowing(params: any): void {
    this.gridApiFollowing = params.api;
    this.gridColumnApiFollowing = params.columnApi;

  }

  createGridFollowing(): void {
    this.columnDefsFollowing = [
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
        field: 'description',
        headerName: 'Description',
        minWidth: 120,
        filter: true,

      },


    ];
    this.autoGroupColumnDefFollowing = {
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
    this.defaultColDefFollowing = {
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: false,
      resizable: true,
      flex: 1,
      minWidth: 100,
    };
    this.rowSelectionFollowing = 'multiple';
    this.rowGroupPanelShowFollowing = 'always';
    this.pivotPanelShowFollowing = 'always';
  }

  onGridReadyReviews(params: any): void {
    this.gridApiReviews = params.api;
    this.gridColumnApiReviews = params.columnApi;

  }
}
