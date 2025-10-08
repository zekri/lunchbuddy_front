import {NgModule} from "@angular/core";

import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {MatSidenavModule} from "@angular/material/sidenav";

import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {RestaurantComponent} from "./restaurant.component";
import {AgGridModule} from "ag-grid-angular";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTabsModule} from "@angular/material/tabs";
import { ItemRestaurantComponent } from './item-restaurant/item-restaurant.component';
import {ActionRenderComponent} from "./action-render/action-render.component";
import {MatDialogModule} from "@angular/material/dialog";
import { DeleteRenderComponent } from './delete-render/delete-render.component';
import { NewItemComponent } from './new-item/new-item.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ItemRenderActionComponent } from './new-item/item-render-action/item-render-action.component';




@NgModule({
  imports: [
    RouterModule.forChild([
        {
          path: '', component: RestaurantComponent
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
  declarations: [ RestaurantComponent, ItemRestaurantComponent, ActionRenderComponent, DeleteRenderComponent, NewItemComponent, ItemRenderActionComponent],
  providers: []
})

export class RestaurantModule {
}
