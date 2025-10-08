import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {MatDialog} from "@angular/material/dialog";
import {SingletonService} from "../../../../singleton.service";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-render-delete',
  templateUrl: './render-delete.component.html',
  styleUrls: ['./render-delete.component.scss']
})
export class RenderDeleteComponent implements ICellRendererAngularComp {

  id: number | undefined;
  status: boolean | undefined;
  params: any;

  constructor(private matdialog: MatDialog,
              public  singleton: SingletonService) {
  }


  agInit(params: ICellRendererParams): void {
    this.params = params;
    if (this.params.value !== true && this.params.value !== false)
      this.id = this.params.value;
    else {
      this.status = this.params.value;
    }
  }


  deleteItem(id: number): void {
          this.singleton.actionChange('deleteitemDefinition', this.params.data)
  }

  refresh(params: any): boolean {
    return false;
  }


}
