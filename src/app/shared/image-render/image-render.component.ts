import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {MatDialog} from "@angular/material/dialog";
import {SingletonService} from "../../singleton.service";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-image-render',
  templateUrl: './image-render.component.html',
  styleUrls: ['./image-render.component.scss']
})
export class ImageRenderComponent implements ICellRendererAngularComp {

  id: number | undefined;
  value = '';
  params: any;
  isSocial = false;
  constructor(private matdialog: MatDialog,
    public  singleton: SingletonService) { }


  agInit(params: ICellRendererParams): void {
    this.params = params;

      if (this.params.value === 'Google') {
        this.isSocial = true;
        this.value = 'assets/gg.png';
      } else if (this.params.value === 'Facebook') {
        this.isSocial = true;
        this.value = 'assets/fb.png'
      } else if (this.params.value === 'Linkedin') {
        this.isSocial = true;
        this.value = 'assets/ld.png'
      } else{
        if(this.params.value ) {
          this.value = this.params.value;
        }
      }



}

  refresh(params: any): boolean {
    return false;
  }
}
