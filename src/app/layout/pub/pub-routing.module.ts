import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {KgToLbComponent} from "./kg-to-lb/kg-to-lb.component";
import {BarManualComponent} from "./bar-manual/bar-manual.component";
import {CalcPercentComponent} from "./calc-percent/calc-percent.component";
import {ContatoComponent} from "./contato/contato.component";
import {BarAutomaticComponent} from "./bar-automatic/bar-automatic.component";
import {InstallInstructionsComponent} from "./install-instructions/install-instructions.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/bar-manual',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: '/bar-manual', pathMatch: 'full' },
      {
        path: 'kg-to-lb',
        component: KgToLbComponent
      },
      {
        path: 'bar-manual',
        component: BarManualComponent
      },
      {
        path: 'bar-automatic/:weight',
        component: BarAutomaticComponent
      },
      {
        path: 'contato',
        component: ContatoComponent
      },
      {
        path: 'calc-percent/:weight',
        component: CalcPercentComponent
      },
      {
        path: 'install',
        component: InstallInstructionsComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PubRoutesModule { }
