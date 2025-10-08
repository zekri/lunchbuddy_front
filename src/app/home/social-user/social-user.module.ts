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

import {SocialUserComponent} from "./social-user.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ActionRenderComponent } from './action-render/action-render.component';
import { DelteRenderComponent } from './delte-render/delte-render.component';
import { ItemSocialUserComponent } from './item-social-user/item-social-user.component';
import { ImageRenderComponent } from '../../shared/image-render/image-render.component';


@NgModule({
  imports: [
    RouterModule.forChild([
        {
          path: '', component: SocialUserComponent
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
  declarations: [ SocialUserComponent, ActionRenderComponent, DelteRenderComponent, ItemSocialUserComponent, ImageRenderComponent],
  providers: []
})

export class SocialUserModule {
}
