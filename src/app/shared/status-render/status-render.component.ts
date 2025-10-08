import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {MatDialog} from "@angular/material/dialog";
import {SingletonService} from "../../singleton.service";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-status-render',
  templateUrl: './status-render.component.html',
  styleUrls: ['./status-render.component.scss']
})
export class StatusRenderComponent implements ICellRendererAngularComp {

  id: number | undefined;
  status: boolean | undefined;
  params: any;
  constructor(private matdialog: MatDialog,
              public  singleton: SingletonService) { }


  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.status = this.params.value

  }

  refresh(params: any): boolean {
    return false;
  }
}
