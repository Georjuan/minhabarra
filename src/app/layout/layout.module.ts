import {NgModule} from '@angular/core';
import {LayoutRoutesModule} from "./layout.routes";
import {PubModule} from "./pub/pub.module";
import {PvtModule} from './pvt/pvt.module';


@NgModule({
  imports: [
    PubModule,
    LayoutRoutesModule,
    PvtModule,
  ]
})
export class LayoutModule { }
