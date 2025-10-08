import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {MatDialog} from "@angular/material/dialog";
import {SingletonService} from "../../../singleton.service";
import {ICellRendererParams} from "ag-grid-community";
import {ItemSocialUserComponent} from "../../social-user/item-social-user/item-social-user.component";
import {ItemEventComponent} from "../item-event/item-event.component";

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

    this.matdialog.open(ItemEventComponent, {data: {item: this.params.data}}).afterClosed().subscribe(update => {

    });


  }




  refresh(params: any): boolean {
    return false;
  }


}
