import {NgModule} from '@angular/core';
import {PubRoutesModule} from "./pub-routing.module";
import {HomeComponent} from "./home/home.component";
import {SharedModule} from "../../shared/shared.module";
import {KgToLbComponent} from './kg-to-lb/kg-to-lb.component';
import { BarManualComponent } from './bar-manual/bar-manual.component';
import { CalcPercentComponent } from './calc-percent/calc-percent.component';

@NgModule({
  declarations: [
    HomeComponent,
    KgToLbComponent,
    BarManualComponent,
    CalcPercentComponent
  ],
    imports: [
        PubRoutesModule,
        SharedModule
    ],
  exports: [
    HomeComponent
  ]
})
export class PubModule { }
