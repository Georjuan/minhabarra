import {NgModule} from '@angular/core';
import {LayoutRoutesModule} from "./layout.routes";
import {PubModule} from "./pub/pub.module";
import {PvtModule} from './pvt/pvt.module';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";


@NgModule({
  imports: [
    PubModule,
    LayoutRoutesModule,
    PvtModule,
  ]
})
export class LayoutModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
    this.matIconRegistry.addSvgIcon(
      "kilos",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/resources/images/kilos.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "libras",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/resources/images/libras.svg")
    );
  }
}
