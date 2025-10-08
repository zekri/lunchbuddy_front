import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {MatDialog} from "@angular/material/dialog";
import {SingletonService} from "../../../singleton.service";
import {ICellRendererParams} from "ag-grid-community";
import {ItemComponent} from "../item/item.component";


@Component({
  selector: 'app-action-render',
  templateUrl: './action-render.component.html',
  styleUrls: ['./action-render.component.scss']
})
export class ActionRenderComponent implements ICellRendererAngularComp {

  id: number | undefined;
  status: boolean | undefined;
  params: any;
  constructor(private matdialog: MatDialog,
              public  singleton: SingletonService) { }


  agInit(params: ICellRendererParams): void {
    this.params = params;
    if( this.params.value !== true && this.params.value !== false)
      this.id = this.params.value;
    else{
      this.status = this.params.value ;
    }
  }


  openItemUser(id: number): void{

    this.matdialog.open(ItemComponent, {data: {item: id}}).afterClosed().subscribe(update => {
      if(update){
        this.singleton.actionChange('refresh')
      }

    });


  }

  refresh(params: any): boolean {
    return false;
  }


}
