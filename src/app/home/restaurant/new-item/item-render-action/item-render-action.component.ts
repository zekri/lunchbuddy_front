import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {MatDialog} from "@angular/material/dialog";
import {SingletonService} from "../../../../singleton.service";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-item-render-action',
  templateUrl: './item-render-action.component.html',
  styleUrls: ['./item-render-action.component.scss']
})
export class ItemRenderActionComponent implements ICellRendererAngularComp {

  id: number | undefined;
  status: boolean | undefined;
  params: any;
  constructor(
              public  singleton: SingletonService) { }


  agInit(params: ICellRendererParams): void {
    this.params = params
  }

  addRestaurant(): void{

    this.singleton.listCity.forEach((item:any)=> {
      if(item.id === this.params.data.idCity){
        item.listAreas.forEach((itemA:any)=> {
          if(itemA.id === this.params.data.idArea){
            if(confirm("Are you sure to add "+this.params.data.name +  " to city " + item.name+ " and area " + itemA.name)) {
              this.singleton.actionChange('addingRestaurant')

              this.singleton.actionChange('addRestaurant', this.params.data)
            }
          }
        })

      }
    })
console.log(this.params)
}


  refresh(params: any): boolean {
    return false;
  }

}
