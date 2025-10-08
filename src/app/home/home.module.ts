import {NgModule} from "@angular/core";

import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./home.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { EventComponent } from './event/event.component';
import { SocialUserComponent } from './social-user/social-user.component';
import {HomeRoutingModule} from "./home.routing.module";
import { ActionRenderComponent } from './restaurant/action-render/action-render.component';
import {MatListModule} from "@angular/material/list";
import { UserDefComponent } from './user-def/user-def.component';
import { ProfileDefComponent } from './profile-def/profile-def.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AgGridModule} from "ag-grid-angular";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  imports: [
    RouterModule.forChild([
        {
          path: '', component: HomeComponent
        }
      ]
    ),
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    HomeRoutingModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
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
  declarations: [HomeComponent, HeaderComponent],
  providers: []
})

export class HomeModule {
}
