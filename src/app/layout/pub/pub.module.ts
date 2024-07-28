import {NgModule} from '@angular/core';
import {PubRoutesModule} from "./pub-routing.module";
import {HomeComponent} from "./home/home.component";
import {SharedModule} from "../../shared/shared.module";
import {KgToLbComponent} from './kg-to-lb/kg-to-lb.component';

@NgModule({
  declarations: [
    HomeComponent,
    KgToLbComponent
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
