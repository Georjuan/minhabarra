import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {Input2DigitsDecimalNumberDirective} from "./directive/input2-digits-decimal-number.directive";

@NgModule({
  declarations: [
    Input2DigitsDecimalNumberDirective,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    FontAwesomeModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
],
  exports: [
    CommonModule,
    RouterOutlet,
    FontAwesomeModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    Input2DigitsDecimalNumberDirective,
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons();
  }
}
