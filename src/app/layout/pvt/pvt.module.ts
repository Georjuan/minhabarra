import {NgModule} from '@angular/core';

import {PvtRoutingModule} from './pvt-routing.module';
import {HomeComponent} from './home/home.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    PvtRoutingModule,
    SharedModule
  ]
})
export class PvtModule { }
