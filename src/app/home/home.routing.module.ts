import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home.component";


const appRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '', loadChildren: () => import('./dashbord/dashbord.module').then(m => m.DashbordModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'restaurant', loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'user', loadChildren: () => import('./user-def/user.module').then(m => m.UserModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'profile', loadChildren: () => import('./profile-def/profile.module').then(m => m.ProfileModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'city', loadChildren: () => import('./city/city.module').then(m => m.CityModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'event', loadChildren: () => import('./event/event.module').then(m => m.EventModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'socialUser', loadChildren: () => import('./social-user/social-user.module').then(m => m.SocialUserModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'definition', loadChildren: () => import('./difinition/difinition.module').then(m => m.DefinitionModule),
        data: {preload: true, delay: false}
      },
      // {


      {path: '**', redirectTo: ''}
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
