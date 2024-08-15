import {NgModule} from '@angular/core';

import {PvtRoutingModule} from './pvt-routing.module';
import {HomeComponent as PubHomeComponent} from '../../shared/components/home/home.component';
import {SharedModule} from "../../shared/shared.module";
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
  
    ProfileComponent
  ],
  imports: [
    PvtRoutingModule,
    SharedModule,
    PubHomeComponent
  ]
})
export class PvtModule { }
