import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {SingletonService} from "../../../singleton.service";

@Component({
  selector: 'app-input-render',
  templateUrl: './input-render.component.html',
  styleUrls: ['./input-render.component.scss']
})
export class InputRenderComponent implements ICellRendererAngularComp {

  value=''
  title=''
  type=''
  params: any;
  constructor(private singleton: SingletonService) { }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.title = this.params.colDef.field;
    if(this.params.colDef.field === 'name'){
      this.type = 'text';
    }else{
      this.type ='number'
    }
    this.value = this.singleton.listAreaByCity[this.params.rowIndex][this.params.colDef.field]
  }

  updateField(): void {
    console.log(this.value)
    this.singleton.listAreaByCity[this.params.rowIndex][this.params.colDef.field] = this.value
  }

  refresh(params: any): boolean {
    return false;
  }

}
