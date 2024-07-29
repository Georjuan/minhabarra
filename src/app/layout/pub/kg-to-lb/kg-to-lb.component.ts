import {Component, ElementRef, ViewChild} from '@angular/core';
import {KgLb} from "../../../shared/model/kg-lb";
import {FunctionsNumberUtils} from "../../../shared/utils/functions-number-utils";

@Component({
  selector: 'app-kg-to-lb',
  templateUrl: './kg-to-lb.component.html',
  styleUrl: './kg-to-lb.component.scss'
})
export class KgToLbComponent {
  @ViewChild('inputKg') inputKg: ElementRef | undefined;
  @ViewChild('inputLb') inputLb: ElementRef | undefined;

  static KG_TO_LB_BASE: number = 2.20462;

  kgToLb: KgLb = new KgLb();

  onClick(event: MouseEvent): void {
    if(this.inputKg?.nativeElement.value == 0 || this.inputLb?.nativeElement.value == 0){
      if(this.inputKg) this.inputKg.nativeElement.value = '';
      if(this.inputLb) this.inputLb.nativeElement.value = '';
    }
  }

  onChangeKg(value: any): void {
    if(FunctionsNumberUtils.isValidNumber(value)){
      this.kgToLb.lb = FunctionsNumberUtils.round(Number(value) * KgToLbComponent.KG_TO_LB_BASE);
    }else{
      this.kgToLb.lb = 0;
      this.kgToLb.kg = 0;
    }
  }

  onChangeLb(value: any): void {
    if(FunctionsNumberUtils.isValidNumber(value)){
      this.kgToLb.kg = FunctionsNumberUtils.round(Number(value) / KgToLbComponent.KG_TO_LB_BASE);
    }else{
      this.kgToLb.lb = 0;
      this.kgToLb.kg = 0;
    }
  }

}
