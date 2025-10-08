import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {SingletonService} from "../../../singleton.service";

@Component({
  selector: 'app-action-render-item',
  templateUrl: './action-render-item.component.html',
  styleUrls: ['./action-render-item.component.scss']
})
export class ActionRenderItemComponent implements ICellRendererAngularComp {
  id: number | undefined;
  status: boolean | undefined;
  params: any;
  constructor(public singleton: SingletonService) { }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  addItem(number: number) {
this.singleton.actionChange('addArea')
  }

  deleteItem(id: any) {
    this.singleton.actionChange('deleteArea', id)
  }
}
