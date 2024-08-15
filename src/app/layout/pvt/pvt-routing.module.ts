import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "../../shared/components/home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuardService} from "../../shared/services/security/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pub/home/bar-manual',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: '/profile', pathMatch: 'full' },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PvtRoutingModule { }
