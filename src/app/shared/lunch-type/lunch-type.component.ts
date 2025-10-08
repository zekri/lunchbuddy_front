import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {MatDialog} from "@angular/material/dialog";
import {SingletonService} from "../../singleton.service";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-lunch-type',
  templateUrl: './lunch-type.component.html',
  styleUrls: ['./lunch-type.component.scss']
})
export class LunchTypeComponent implements ICellRendererAngularComp {

  id: number | undefined;
  value = 0;
  params: any;
  isSocial = false;
  constructor(private matdialog: MatDialog,
              public  singleton: SingletonService) { }


  agInit(params: ICellRendererParams): void {
    this.params = params;
  this.value =this.params.value




  }

  refresh(params: any): boolean {
    return false;
  }

}
