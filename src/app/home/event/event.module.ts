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

import {EventComponent} from "./event.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ActionRenderComponent } from './action-render/action-render.component';
import { DeleteRenderComponent } from './delete-render/delete-render.component';
import { ItemEventComponent } from './item-event/item-event.component';


@NgModule({
  imports: [
    RouterModule.forChild([
        {
          path: '', component: EventComponent
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
  declarations: [ EventComponent, ActionRenderComponent, DeleteRenderComponent, ItemEventComponent],
  providers: []
})

export class EventModule {
}
