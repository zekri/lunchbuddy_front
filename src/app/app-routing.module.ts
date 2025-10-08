import { NgModule } from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';
import {LoginGuard} from "./shared/guards/login.guard";
import {AppWebGuard} from "./shared/guards/home.guard";

const routes: Routes = [];


  const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivateChild: [LoginGuard], data: {preload: true, delay: false}},
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivateChild: [AppWebGuard], data: {preload: true, delay: false}}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes
      , {preloadingStrategy: NoPreloading}
    )
  ],
  exports: [RouterModule],
})

export class AppRoutingModule { }
