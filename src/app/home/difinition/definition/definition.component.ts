import {Component, OnDestroy, OnInit} from '@angular/core';
import {SingletonService} from "../../../singleton.service";
import {DifinitionService} from "../difinition.service";
import {RenderDeleteComponent} from "./render-delete/render-delete.component";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ActionRenderComponent} from "../../city/action-render/action-render.component";
import {DeleteRenderComponent} from "../../city/delete-render/delete-render.component";

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.scss']
})
export class DefinitionComponent implements OnInit, OnDestroy {
  loader = false;
  gridApiDietary: any;
  gridColumnApiDietary: any;
  columnDefsDietary: any;
  autoGroupColumnDefDietary: any;
  defaultColDefDietary: any;
  rowSelectionDietary: any;
  rowGroupPanelShowDietary: any;
  frameworkComponentsDietary: any;
  pivotPanelShowDietary: any;
  rowDataDietary: any;

  gridApiCuisine: any;
  gridColumnApiCuisine: any;
  columnDefsCuisine: any;
  autoGroupColumnDefCuisine: any;
  defaultColDefCuisine: any;
  rowSelectionCuisine: any;
  rowGroupPanelShowCuisine: any;
  frameworkComponentsCuisine: any;
  pivotPanelShowCuisine: any;
  rowDataCuisine: any;

  gridApiProfession: any;
  gridColumnApiProfession: any;
  columnDefsProfession: any;
  autoGroupColumnDefProfession: any;
  defaultColDefProfession: any;
  rowSelectionProfession: any;
  rowGroupPanelShowProfession: any;
  frameworkComponentsProfession: any;
  pivotPanelShowProfession: any;
  rowDataProfession: any;

  gridApiLookFor: any;
  gridColumnApiLookFor: any;
  columnDefsLookFor: any;
  autoGroupColumnDefLookFor: any;
  defaultColDefLookFor: any;
  rowSelectionLookFor: any;
  rowGroupPanelShowLookFor: any;
  frameworkComponentsLookFor: any;
  pivotPanelShowLookFor: any;
  rowDataLookFor: any;

  gridApiLookForCategory: any;
  gridColumnApiLookForCategory: any;
  columnDefsLookForCategory: any;
  autoGroupColumnDefLookForCategory: any;
  defaultColDefLookForCategory: any;
  rowSelectionLookForCategory: any;
  rowGroupPanelShowLookForCategory: any;
  frameworkComponentsLookForCategory: any;
  pivotPanelShowLookForCategory: any;
  rowDataLookForCategory: any;

  gridApiInterest: any;
  gridColumnApiInterest: any;
  columnDefsInterest: any;
  autoGroupColumnDefInterest: any;
  defaultColDefInterest: any;
  rowSelectionInterest: any;
  rowGroupPanelShowInterest: any;
  frameworkComponentsInterest: any;
  pivotPanelShowInterest: any;
  rowDataInterest: any;

  gridApiInterestCategory: any;
  gridColumnApiInterestCategory: any;
  columnDefsInterestCategory: any;
  autoGroupColumnDefInterestCategory: any;
  defaultColDefInterestCategory: any;
  rowSelectionInterestCategory: any;
  rowGroupPanelShowInterestCategory: any;
  frameworkComponentsInterestCategory: any;
  pivotPanelShowInterestCategory: any;
  rowDataInterestCategory: any;

  gridApiLanguage: any;
  gridColumnApiLanguage: any;
  columnDefsLanguage: any;
  autoGroupColumnDefLanguage: any;
  defaultColDefLanguage: any;
  rowSelectionLanguage: any;
  rowGroupPanelShowLanguage: any;
  frameworkComponentsLanguage: any;
  pivotPanelShowLanguage: any;
  rowDataLanguage: any;


  newDietary = ''
  newCuisine = ''
  newProfession= ''
  newLookFor= ''
  newLookForCategory= ''
  newLookForImage= ''
  selectedLookForCategory= ''
  newInterest= ''
  newInterestImage= ''
  selectedInterestCategory= ''
  newInterestCategory= ''
  newLanguage= ''
  newLanguageImage= ''
  subscription: Subscription[] = [];
  constructor(public singleton: SingletonService,
              private router: Router,
              private definitionService: DifinitionService) {
    const sub = this.singleton.actionObservable().subscribe((data:any) => {
      if (data.function === 'refresh') {
        this.getDietaryList();
        this.getCuisineList();
        this.getProfessionList();
        this.getLookForList();
        this.getInterestList();
        this.getLanguageList();
      }
      if (data.function === 'deleteitemDefinition'){
        if(data.data.type === 'categoriesInterest'){
          this.deleteInterestCategoryitem(data.data.idInterestCategory);
        }
        if(data.data.type === 'interest'){
          this.deleteInterestitem(data.data.idInterest);
        }
        if(data.data.type === 'categoriesLookFor'){
          this.deleteLookForCategoryitem(data.data.idLookForCategory);
        }
        if(data.data.type === 'lookFor'){
          this.deleteLookForitem(data.data.idLookFor);
        }
        if(data.data.type === 'language'){
          this.deleteLanguageitem(data.data.idLanguage);
        }
        if(data.data.type === 'profession'){
          this.deleteProfessionitem(data.data.idPreofessionCategory);
        }
        if(data.data.type === 'cuisine'){
          this.deleteCuisineitem(data.data.id);
        }
        if(data.data.type === 'dietary'){
          this.deleteDietaryitem(data.data.id);
        }
      }

    });
    this.subscription.push(sub);
    this.singleton.titleHeader = 'Definitions'
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub: any) => sub.unsubscribe());
    }

  ngOnInit(): void {
    if(this.singleton.checkRole(16)){
      this.frameworkComponentsDietary = {
        RenderDeleteComponent
      };
      this.frameworkComponentsCuisine = {
        RenderDeleteComponent
      };
      this.frameworkComponentsProfession = {
        RenderDeleteComponent
      };
      this.frameworkComponentsLookFor = {
        RenderDeleteComponent
      };
      this.frameworkComponentsLookForCategory = {
        RenderDeleteComponent
      };
      this.frameworkComponentsInterest = {
        RenderDeleteComponent
      };
      this.frameworkComponentsInterestCategory = {
        RenderDeleteComponent
      };
      this.frameworkComponentsLanguage = {
        RenderDeleteComponent
      };

      const listInterest: any[] = [];
      this.singleton.listInterests.forEach((item:any) => {
        item.type='categoriesInterest';
        item.listInterest.forEach((itemL:any) => {
          itemL.categoryName = item.name;
          itemL.type='interest';
          listInterest.push(itemL);
        })
      })
      this.rowDataInterestCategory =  this.singleton.listInterests;
      this.rowDataInterest = listInterest;
      this.createGridInterestCategory();
      this.createGridInterest();
      const listLookFor: any[] = [];
      this.singleton.listLookFors.forEach((item:any) => {
        item.type='categoriesLookFor';
        item.listLookFor.forEach((itemL:any) => {
          itemL.categoryName = item.name;
          itemL.type='lookFor';
          listLookFor.push(itemL);
        })
      })
      this.rowDataLookForCategory =  this.singleton.listLookFors;
      this.rowDataLookFor = listLookFor;
      this.createGridLookForCategory();
      this.createGridLookFor();
      this.rowDataDietary = this.singleton.listDietaries;
      this.createGridDietary();
      this.rowDataCuisine = this.singleton.listKitchens;
      this.createGridCuisine();
      this.rowDataProfession = this.singleton.listProfessionals;
      this.createGridProfession();
      this.rowDataLanguage= this.singleton.listLanguages;
      this.createGridLanguage();


    }
    else{
      this.router.navigate(['']);
    }

  }
  saveDietary(): void{
    let obj:any ={
      id: null,
      name: this.newDietary,
      active:true,
    }
    this.definitionService.saveDietary(obj).subscribe((data: any) => {
      this.getDietaryList();
      this.newDietary ='';
    })
  }

  saveCuisine(): void{
    let obj:any ={
      id: null,
      name: this.newCuisine,
      active:true,
    }
    this.definitionService.saveCuisine(obj).subscribe((data: any) => {
      this.getCuisineList();
      this.newCuisine ='';
    })
  }

  saveProfession(): void{
    let obj:any ={
      idPreofessionCategory: null,
      name: this.newProfession,
      listProfession: [],
      active:true,
    }
    this.definitionService.saveProfession(obj).subscribe((data: any) => {
      this.getProfessionList();
      this.newProfession ='';
    })
  }

  saveLookForCategory(): void{
    let obj:any ={
      id: null,
      name: this.newLookForCategory
    }
    this.definitionService.saveLookForCategory(obj).subscribe((data: any) => {
      this.getLookForList();
      this.newLookForCategory ='';
    })
  }

  saveLookFor(): void{
    let obj: any = {
      idLookFor:null,
      idCategory: Number(this.selectedLookForCategory) ,
      name: this.newLookFor,
      image: this.newLookForImage,
      active:true
    }
    this.definitionService.saveLookFor(obj).subscribe((data: any) => {
      this.getLookForList();
      this.selectedLookForCategory ='';
      this.newLookFor ='';
      this.newLookForImage ='';
    })
  }

  saveInterestCategory(): void{
    let obj:any ={
      id: null,
      name: this.newInterestCategory
    }
    this.definitionService.saveInterestCategory(obj).subscribe((data: any) => {
      this.getInterestList();
      this.newInterestCategory ='';
    })
  }

  saveInterest(): void{
    let obj: any = {
      idInterest:null,
      idCategory: Number(this.selectedInterestCategory) ,
      name: this.newInterest,
      image: this.newInterestImage,
      active:true
    }
    this.definitionService.saveInterest(obj).subscribe((data: any) => {
      this.getInterestList();
      this.selectedInterestCategory ='';
      this.newInterest ='';
      this.newInterestImage ='';
    })
  }

  saveLanguage(): void{
    let obj:any ={
      idLanguage: null,
      name: this.newLanguageImage,
      image: this.newLanguage,
      active:true,
    }
    this.definitionService.saveLanguage(obj).subscribe((data: any) => {
      this.getLanguageList();
      this.newLanguage ='';
      this.newLanguageImage ='';
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
      this.rowDataLanguage = data;
      this.createGridLanguage();
    })
  }

  createGridLanguage(): void {
    this.columnDefsLanguage = [
   this.singleton.checkRole(29)?  {
        field: 'idLanguage',
        headerComponent: 'RenderDeleteComponent',
        maxWidth: 60,
        cellRenderer: 'RenderDeleteComponent',
        pinned: 'left',
      }: {
     maxWidth: 0,
   },
      {
        field: 'idLanguage',
        headerName: 'Id',
        maxWidth: 70,

      },
      {
        field: 'image',
        headerName: 'Name',
        minWidth: 120,
        filter: 'agTextColumnFilter',
        cellClass: 'rowBold',
      },
      {
        field: 'name',
        headerName: 'Image',
        minWidth: 120,
        filter: 'agTextColumnFilter',
      }
    ];
    this.autoGroupColumnDefLanguage = {
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
    this.defaultColDefLanguage = {
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: false,
      resizable: true,
      flex: 1,
      minWidth: 100,
    };
    this.rowSelectionLanguage = 'multiple';
    this.rowGroupPanelShowLanguage = 'always';
    this.pivotPanelShowLanguage = 'always';
  }

  onGridReadyLanguage(params: any): void {
    this.gridApiLanguage = params.api;
    this.gridColumnApiLanguage = params.columnApi;

  }

  deleteInterestCategoryitem(id: any): void {
    this.definitionService.deleteInterestCategory(id).subscribe((data: any) => {
      this.getInterestList();
    })
  }

  deleteInterestitem(id: any): void {
    this.definitionService.deleteInterest(id).subscribe((data: any) => {
      this.getInterestList();
    })
  }

  getInterestList(): void{
    this.loader = true;
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
      this.rowDataInterestCategory = data;
      this.rowDataInterest = listInterest;
      this.createGridInterestCategory();
      this.createGridInterest();
      this.loader = false;
    })
  }

  createGridInterest(): void {
    this.columnDefsInterest = [
      this.singleton.checkRole(21)?  {
        field: 'idInterest',
        headerComponent: 'RenderDeleteComponent',
        maxWidth: 60,
        cellRenderer: 'RenderDeleteComponent',
        cellRendererParams: {
          item: 'categoriesInterest'
        },
        pinned: 'left',
      }: {maxWidth: 0,},
      {
        field: 'idInterest',
        headerName: 'Id',
        maxWidth: 70,

      },
      {
        field: 'categoryName',
        headerName: 'Category',
        minWidth: 120,
        filter: 'agTextColumnFilter',
      },
      {
        field: 'name',
        headerName: 'Name',
        minWidth: 120,
        filter: 'agTextColumnFilter',
        cellClass: 'rowBold',
      },
      {
        field: 'image',
        headerName: 'Image',
        minWidth: 120,
        filter: 'agTextColumnFilter',
      }
    ];
    this.autoGroupColumnDefInterest = {
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
    this.defaultColDefInterest = {
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: false,
      resizable: true,
      flex: 1,
      minWidth: 100,
    };
    this.rowSelectionInterest = 'multiple';
    this.rowGroupPanelShowInterest = 'always';
    this.pivotPanelShowInterest = 'always';
  }

  createGridInterestCategory(): void {
    this.columnDefsInterestCategory = [
      this.singleton.checkRole(19)?{
        field: 'idInterestCategory',
        headerComponent: 'RenderDeleteComponent',
        maxWidth: 60,
        cellRenderer: 'RenderDeleteComponent',
        pinned: 'left',
      }: { maxWidth: 0,},
      {
        field: 'idInterestCategory',
        headerName: 'Id',
        maxWidth: 70,

      },
      {
        field: 'name',
        headerName: 'Name',
        minWidth: 120,
        filter: 'agTextColumnFilter',
        cellClass: 'rowBold',
      },

    ];
    this.autoGroupColumnDefInterestCategory = {
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
    this.defaultColDefInterestCategory = {
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: false,
      resizable: true,
      flex: 1,
      minWidth: 100,
    };
    this.rowSelectionInterestCategory = 'multiple';
    this.rowGroupPanelShowInterestCategory = 'always';
    this.pivotPanelShowInterestCategory = 'always';
  }

  onGridReadyInterest(params: any): void {
    this.gridApiInterest = params.api;
    this.gridColumnApiInterest = params.columnApi;

  }

  onGridReadyInterestCategory(params: any): void {
    this.gridApiInterestCategory = params.api;
    this.gridColumnApiInterestCategory = params.columnApi;

  }

  deleteLookForCategoryitem(id: any): void {
    this.definitionService.deleteLookForCategory(id).subscribe((data: any) => {
      this.getLookForList();
    })
  }

  deleteLookForitem(id: any): void {
    this.definitionService.deleteLookFor(id).subscribe((data: any) => {
      this.getLookForList();
    })
  }

  deleteLanguageitem(id: any): void {
    this.definitionService.deleteLanguage(id).subscribe((data: any) => {
      this.getLanguageList();
    })
  }

  deleteProfessionitem(id: any): void {
    this.definitionService.deleteProfession(id).subscribe((data: any) => {
      this.getProfessionList();
    })
  }

  deleteCuisineitem(id: any): void {
    this.definitionService.deleteCuisine(id).subscribe((data: any) => {
      this.getCuisineList();
    })
  }

  deleteDietaryitem(id: any): void {
    this.definitionService.deleteDietary(id).subscribe((data: any) => {
      this.getDietaryList();
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
      this.rowDataLookForCategory = data;
      this.rowDataLookFor = listLookFor;
      this.createGridLookForCategory();
      this.createGridLookFor();
    })
  }

  createGridLookFor(): void {
    this.columnDefsLookFor = [
      this.singleton.checkRole(26)?{
        field: 'idLookFor',
        headerComponent: 'RenderDeleteComponent',
        maxWidth: 60,
        cellRenderer: 'RenderDeleteComponent',
        pinned: 'left',
      }:{ maxWidth: 0,},
      {
        field: 'idLookFor',
        headerName: 'Id',
        maxWidth: 70,

      },
      {
        field: 'categoryName',
        headerName: 'Category',
        minWidth: 120,
        filter: 'agTextColumnFilter',
      },
      {
        field: 'name',
        headerName: 'Name',
        minWidth: 120,
        filter: 'agTextColumnFilter',
        cellClass: 'rowBold',
      },
      {
        field: 'image',
        headerName: 'Image',
        minWidth: 120,
        filter: 'agTextColumnFilter',
      }
    ];
    this.autoGroupColumnDefLookFor = {
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
    this.defaultColDefLookFor = {
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: false,
      resizable: true,
      flex: 1,
      minWidth: 100,
    };
    this.rowSelectionLookFor = 'multiple';
    this.rowGroupPanelShowLookFor = 'always';
    this.pivotPanelShowLookFor = 'always';
  }

  createGridLookForCategory(): void {
    this.columnDefsLookForCategory = [
      this.singleton.checkRole(24)?{
        field: 'idLookForCategory',
        headerComponent: 'RenderDeleteComponent',
        maxWidth: 60,
        cellRenderer: 'RenderDeleteComponent',
        pinned: 'left',
      }:{ maxWidth: 0,},
      {
        field: 'idLookForCategory',
        headerName: 'Id',
        maxWidth: 70,

      },
      {
        field: 'name',
        headerName: 'Name',
        minWidth: 120,
        filter: 'agTextColumnFilter',
        cellClass: 'rowBold',
      },

    ];
    this.autoGroupColumnDefLookForCategory = {
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
    this.defaultColDefLookForCategory = {
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: false,
      resizable: true,
      flex: 1,
      minWidth: 100,
    };
    this.rowSelectionLookForCategory = 'multiple';
    this.rowGroupPanelShowLookForCategory = 'always';
    this.pivotPanelShowLookForCategory = 'always';
  }

  onGridReadyLookFor(params: any): void {
    this.gridApiLookFor = params.api;
    this.gridColumnApiLookFor = params.columnApi;

  }

  onGridReadyLookForCategory(params: any): void {
    this.gridApiLookForCategory = params.api;
    this.gridColumnApiLookForCategory = params.columnApi;

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
      this.rowDataProfession = data;
      this.createGridProfession();
    })
  }

  createGridProfession(): void {
    this.columnDefsProfession = [
      this.singleton.checkRole(32)?{
        field: 'idPreofessionCategory',
        headerComponent: 'RenderDeleteComponent',
        maxWidth: 60,
        cellRenderer: 'RenderDeleteComponent',
        pinned: 'left',
      }:{ maxWidth: 0,},
      {
        field: 'idPreofessionCategory',
        headerName: 'Id',
        maxWidth: 70,

      },
      {
        field: 'name',
        headerName: 'Name',
        minWidth: 120,
        filter: 'agTextColumnFilter',
        cellClass: 'rowBold',
      }
    ];
    this.autoGroupColumnDefProfession = {
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
    this.defaultColDefProfession = {
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: false,
      resizable: true,
      flex: 1,
      minWidth: 100,
    };
    this.rowSelectionProfession = 'multiple';
    this.rowGroupPanelShowProfession = 'always';
    this.pivotPanelShowProfession = 'always';
  }

  onGridReadyProfession(params: any): void {
    this.gridApiProfession = params.api;
    this.gridColumnApiProfession = params.columnApi;

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
      this.rowDataCuisine = data;
      this.createGridCuisine();
    })
  }

  createGridCuisine(): void {
    this.columnDefsCuisine = [
      this.singleton.checkRole(35)?{
        field: 'id',
        headerComponent: 'RenderDeleteComponent',
        maxWidth: 60,
        cellRenderer: 'RenderDeleteComponent',
        pinned: 'left',
      }:{ maxWidth: 0,},
      {
        field: 'id',
        headerName: 'Id',
        maxWidth: 70,

      },
      {
        field: 'name',
        headerName: 'Name',
        minWidth: 120,
        filter: 'agTextColumnFilter',
        cellClass: 'rowBold',
      }
    ];
    this.autoGroupColumnDefCuisine = {
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
    this.defaultColDefCuisine = {
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: false,
      resizable: true,
      flex: 1,
      minWidth: 100,
    };
    this.rowSelectionCuisine = 'multiple';
    this.rowGroupPanelShowCuisine = 'always';
    this.pivotPanelShowCuisine = 'always';
  }

  onGridReadyCuisine(params: any): void {
    this.gridApiCuisine = params.api;
    this.gridColumnApiCuisine = params.columnApi;

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
      this.rowDataDietary = data;
      this.createGridDietary();
    })
  }

  createGridDietary(): void {
    this.columnDefsDietary = [
      this.singleton.checkRole(38)?{
        field: 'id',
        headerComponent: 'RenderDeleteComponent',
        maxWidth: 60,
        cellRenderer: 'RenderDeleteComponent',
        pinned: 'left',
      }:{ maxWidth: 0,},
      {
        field: 'id',
        headerName: 'Id',
        maxWidth: 70,

      },
      {
        field: 'name',
        headerName: 'Name',
        minWidth: 120,
        filter: 'agTextColumnFilter',
        cellClass: 'rowBold',
      }
    ];
    this.autoGroupColumnDefDietary = {
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
    this.defaultColDefDietary = {
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: false,
      resizable: true,
      flex: 1,
      minWidth: 100,
    };
    this.rowSelectionDietary = 'multiple';
    this.rowGroupPanelShowDietary = 'always';
    this.pivotPanelShowDietary = 'always';
  }

  onGridReadyDietary(params: any): void {
    this.gridApiDietary = params.api;
    this.gridColumnApiDietary = params.columnApi;

  }

}
