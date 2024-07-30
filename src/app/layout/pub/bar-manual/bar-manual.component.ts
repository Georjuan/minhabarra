import {Component, OnInit} from '@angular/core';
import {Anilha} from "../../../shared/model/anilha";
import {FunctionsNumberUtils} from "../../../shared/utils/functions-number-utils";
import {Barra} from "../../../shared/model/barra";

@Component({
  selector: 'app-bar-manual',
  templateUrl: './bar-manual.component.html',
  styleUrl: './bar-manual.component.scss'
})
export class BarManualComponent implements OnInit {

  protected readonly FunctionsNumberUtils = FunctionsNumberUtils;

  barras: Array<Barra> = new Array<Barra>();
  anilhasKg: Array<Anilha> = new Array<Anilha>();
  anilhasLb: Array<Anilha> = new Array<Anilha>();

  barImage: String = "url(resources/images/bar.png)";

  barWeight: number = 20;

  ngOnInit() {
    fetch('resources/data/anilhas-kg.json').then(res => res.json())
      .then(json => {
        this.anilhasKg = json as Array<Anilha>;
        this.anilhasKg = this.anilhasKg.sort((a, b) => b.peso - a.peso);
      });
    fetch('resources/data/anilhas-lb.json').then(res => res.json())
      .then(json => {
        this.anilhasLb = json as Array<Anilha>;
        this.anilhasLb = this.anilhasLb.sort((a, b) => b.peso - a.peso);
      });
    fetch('resources/data/barras.json').then(res => res.json())
      .then(json => {
        this.barras = json as Array<Barra>;
        this.barras = this.barras.sort((a, b) => this.getPesoKg(b) - this.getPesoKg(a));
      });
  }

  getPesoKg(item: any): number{
    return item.unidade == 'kg' ? item.peso : (item.peso / FunctionsNumberUtils.KG_TO_LB_BASE);
  }

  anilhas(): Array<Anilha>{
    return this.anilhasKg.filter(anilha => anilha.quantidade > 0)
                .concat(this.anilhasLb.filter(anilha => anilha.quantidade > 0));
  }

  pesoTotalKg(): number{
    return this.anilhas().reduce((total, anilha) =>
      total +
      ((anilha.unidade == 'kg' ? anilha.peso : (anilha.peso / FunctionsNumberUtils.KG_TO_LB_BASE)) *
      anilha.quantidade * 2), 0) + this.barWeight;
  }

  limpar(): void{
    this.anilhasKg.forEach(anilha => anilha.quantidade = 0);
    this.anilhasLb.forEach(anilha => anilha.quantidade = 0);
  }

  pesoTotalLb(): number{
    return this.pesoTotalKg() * FunctionsNumberUtils.KG_TO_LB_BASE;
  }

  add(anilha: Anilha): void{
    if(anilha.unidade=='kg'){
      this.anilhasKg.forEach(_anilha => {
        if(_anilha.peso == anilha.peso) _anilha.quantidade = (_anilha.quantidade || 0) + 1;
      });
    }
    if(anilha.unidade=='lb'){
      this.anilhasLb.forEach(_anilha => {
        if(_anilha.peso == anilha.peso) _anilha.quantidade = (_anilha.quantidade || 0) + 1;
      });
    }
  }

  remove(anilha: Anilha): void{
    if(anilha.unidade=='kg'){
      this.anilhasKg.forEach(_anilha => {
        if(_anilha.peso === anilha.peso) _anilha.quantidade = (_anilha.quantidade || 0) - 1;
        _anilha.quantidade = Math.max(0, _anilha.quantidade);
      });
    }
    if(anilha.unidade=='lb'){
      this.anilhasLb.forEach(_anilha => {
        if(_anilha.peso === anilha.peso) _anilha.quantidade = (_anilha.quantidade || 0) - 1;
        _anilha.quantidade = Math.max(0, _anilha.quantidade);
      });
    }
  }

}
