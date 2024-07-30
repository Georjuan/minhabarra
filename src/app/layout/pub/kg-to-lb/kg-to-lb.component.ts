import {Component, ElementRef, ViewChild} from '@angular/core';
import {KgLb} from "../../../shared/model/kg-lb";
import {FunctionsNumberUtils} from "../../../shared/utils/functions-number-utils";

@Component({
  selector: 'app-kg-to-lb',
  templateUrl: './kg-to-lb.component.html',
  styleUrl: './kg-to-lb.component.scss'
})
export class KgToLbComponent {
  @ViewChild('inputKg') inputKg: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('inputLb') inputLb: ElementRef<HTMLInputElement> | undefined;

  kgToLb: KgLb = new KgLb();

  onClick(event: MouseEvent, elementRef: HTMLInputElement): void {
    if(elementRef.value.trim() == '0'){
      elementRef.value = '';
    }
  }

  onKeydown(event: KeyboardEvent, elementRef: HTMLInputElement): void {
    if(event.key == 'Enter'){
      elementRef.blur();
    }
  }

  onChangeKg(value: any): void {
    if(FunctionsNumberUtils.isValidNumber(value)){
      this.kgToLb.lb = FunctionsNumberUtils.round(Number(value) * FunctionsNumberUtils.KG_TO_LB_BASE);
    }else{
      this.kgToLb.lb = 0;
      this.kgToLb.kg = 0;
    }
  }

  onChangeLb(value: any): void {
    if(FunctionsNumberUtils.isValidNumber(value)){
      this.kgToLb.kg = FunctionsNumberUtils.round(Number(value) / FunctionsNumberUtils.KG_TO_LB_BASE);
    }else{
      this.kgToLb.lb = 0;
      this.kgToLb.kg = 0;
    }
  }

}
