import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {MatDialog} from "@angular/material/dialog";
import {SingletonService} from "../../../singleton.service";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-delete-render',
  templateUrl: './delete-render.component.html',
  styleUrls: ['./delete-render.component.scss']
})
export class DeleteRenderComponent implements ICellRendererAngularComp {

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
    if (confirm("Are you sure to disable " + this.params.data.name)) {
      //  this.singleton.actionChange('deleteRestaurant', id)
    }
  }

  refresh(params: any): boolean {
    return false;
  }

}
