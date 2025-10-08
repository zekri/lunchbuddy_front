import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {MatDialog} from "@angular/material/dialog";
import {SingletonService} from "../../../singleton.service";
import {ICellRendererParams} from "ag-grid-community";
import {ItemRestaurantComponent} from "../../restaurant/item-restaurant/item-restaurant.component";
import {ItemCityComponent} from "../item-city/item-city.component";

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
    this.singleton.listCity.forEach((item:any)=> {
      if(item.id === id){
        if(confirm("Are you sure to delete "+item.name)) {
          this.singleton.actionChange('deleteCity', id)
        }
      }
    })



  }

  refresh(params: any): boolean {
    return false;
  }

}
