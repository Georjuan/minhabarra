import { Component } from '@angular/core';
import {KgLb} from "../../../shared/model/kg-lb";
import {FunctionsNumberUtils} from "../../../shared/utils/functions-number-utils";

@Component({
  selector: 'app-kg-to-lb',
  templateUrl: './kg-to-lb.component.html',
  styleUrl: './kg-to-lb.component.scss'
})
export class KgToLbComponent {

  static KG_TO_LB_BASE: number = 2.20462;

  kgToLb: KgLb = new KgLb();

  onChangeKg(value: any): void {
    if(FunctionsNumberUtils.isValidNumber(value)){
      this.kgToLb.lb = FunctionsNumberUtils.round(value * KgToLbComponent.KG_TO_LB_BASE);
    }else{
      this.kgToLb.lb = 0;
      this.kgToLb.kg = 0;
    }
  }

  onChangeLb(value: any): void {
    if(FunctionsNumberUtils.isValidNumber(value)){
      this.kgToLb.kg = FunctionsNumberUtils.round(value / KgToLbComponent.KG_TO_LB_BASE);
    }else{
      this.kgToLb.lb = 0;
      this.kgToLb.kg = 0;
    }
  }

}
