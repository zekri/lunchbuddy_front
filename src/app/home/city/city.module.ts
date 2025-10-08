import {NgModule} from "@angular/core";

import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {MatSidenavModule} from "@angular/material/sidenav";

import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

import {AgGridModule} from "ag-grid-angular";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {CityComponent} from "./city.component";
import { DeleteRenderComponent } from './delete-render/delete-render.component';
import { ActionRenderComponent } from './action-render/action-render.component';
import { ItemCityComponent } from './item-city/item-city.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatDialogModule} from "@angular/material/dialog";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { ActionRenderItemComponent } from './action-render-item/action-render-item.component';
import { InputRenderComponent } from './input-render/input-render.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ItemAreaComponent } from './item-area/item-area.component';


@NgModule({
  imports: [
    RouterModule.forChild([
        {
          path: '', component: CityComponent
        }
      ]
    ),
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    AgGridModule,
    MatProgressBarModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,


  ],
  declarations: [ CityComponent, DeleteRenderComponent, ActionRenderComponent, ItemCityComponent, ActionRenderItemComponent, InputRenderComponent, ItemAreaComponent],
  providers: []
})

export class CityModule {
}
