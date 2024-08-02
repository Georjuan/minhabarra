import {Component, ElementRef, OnInit, signal, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FunctionsStringUtils} from "../../../shared/utils/functions-string-utils";
import {FunctionsNumberUtils} from "../../../shared/utils/functions-number-utils";

@Component({
  selector: 'app-calc-percent',
  templateUrl: './calc-percent.component.html',
  styleUrl: './calc-percent.component.scss'
})
export class CalcPercentComponent implements OnInit {
  weight: number = 0;

  @ViewChild('inputWight') inputWight: ElementRef<HTMLInputElement> | undefined;

  data: Array<{percentage: number, kilos: number, libras: number}> = new Array<{percentage: number; kilos: number; libras: number}>()

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    let _weight: string | null = this.route.snapshot.paramMap.get('weight');

    FunctionsStringUtils.isNotBlank(_weight) ?
      this.weight = parseFloat(_weight as string) : this.weight = 0;

    this.calc();
  }

  onKeydown(event: KeyboardEvent): void {
    if(['Enter', 'NumpadEnter', 'Tab'].includes(event.key)){
      if(this.inputWight) this.inputWight.nativeElement.blur();
    }
  }

  onClick(): void {
    if(this.weight == 0){
      if(this.inputWight) this.inputWight.nativeElement.value = '';
    }
  }

  onChangeWeight(value: any): void {
    if(FunctionsNumberUtils.isValidNumber(value)){
      this.weight = Number(value);
    }else{
      this.weight = 0;
    }
    this.calc();
  }

  lbUnit = signal(true);
  changeUnitEvent(event: MouseEvent) {
    this.lbUnit.set(!this.lbUnit());
    event.stopPropagation();
    this.calc();
  }

  calc(): void{
    let _kilos: number = this.lbUnit() ? (this.weight / 2.20462) : this.weight;
    let _libras: number = this.lbUnit() ? this.weight : (this.weight * 2.20462);

    this.data = new Array<{percentage: number; kilos: number; libras: number}>();

    for (let i: number = 100; i >=5; i-=5) {
      this.data.push({
        percentage: i/100,
        kilos: FunctionsNumberUtils.round(_kilos * i / 100),
        libras: FunctionsNumberUtils.round(_libras * i / 100)
      });
    }
  }

  protected readonly FunctionsNumberUtils = FunctionsNumberUtils;
}
