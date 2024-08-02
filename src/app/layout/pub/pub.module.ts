import {NgModule} from '@angular/core';
import {PubRoutesModule} from "./pub-routing.module";
import {HomeComponent} from "./home/home.component";
import {SharedModule} from "../../shared/shared.module";
import {KgToLbComponent} from './kg-to-lb/kg-to-lb.component';
import { BarManualComponent } from './bar-manual/bar-manual.component';
import { CalcPercentComponent } from './calc-percent/calc-percent.component';
import { ContatoComponent } from './contato/contato.component';
import {MatTooltip} from "@angular/material/tooltip";
import {MatOption, MatSelect} from "@angular/material/select";
import { BarAutomaticComponent } from './bar-automatic/bar-automatic.component';
import {MatSlideToggle} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    HomeComponent,
    KgToLbComponent,
    BarManualComponent,
    CalcPercentComponent,
    ContatoComponent,
    BarAutomaticComponent
  ],
  imports: [
    PubRoutesModule,
    SharedModule,
    MatTooltip,
    MatSelect,
    MatOption,
    MatSlideToggle
  ],
  exports: [
    HomeComponent
  ]
})
export class PubModule { }
