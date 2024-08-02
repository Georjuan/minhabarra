import {Component, OnInit} from '@angular/core';
import {Anilha} from "../../../shared/model/anilha";
import {FunctionsNumberUtils} from "../../../shared/utils/functions-number-utils";
import {Barra} from "../../../shared/model/barra";
import {MatSelectChange} from "@angular/material/select";
import {StorageService} from "../../../shared/services/storage.service";

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

  //Weight in kg
  barWeight: number = 20;

  ngOnInit() {
    fetch('resources/data/anilhas-kg.json').then(res => res.json())
      .then(json => {
        this.anilhasKg = json as Array<Anilha>;
        this.anilhasKg.forEach(anilha => anilha.quantidade = 0);
        this.anilhasKg = this.anilhasKg.sort((a, b) => b.peso - a.peso);
      });
    fetch('resources/data/anilhas-lb.json').then(res => res.json())
      .then(json => {
        this.anilhasLb = json as Array<Anilha>;
        this.anilhasLb.forEach(anilha => anilha.quantidade = 0);
        this.anilhasLb = this.anilhasLb.sort((a, b) => b.peso - a.peso);
      });
    fetch('resources/data/barras.json').then(res => res.json())
      .then(json => {
        this.barras = json as Array<Barra>;
        this.barras = this.barras.sort((a, b) => this.getPesoKg(b) - this.getPesoKg(a));

        this.selectPreferencia();
      });
  }

  selectPreferencia(){
    if(StorageService.contains(StorageService.BARRA_PREFERENCIAL)){
      let preferenciaBarra: number = StorageService.get(StorageService.BARRA_PREFERENCIAL) as number;
      this.barWeight = preferenciaBarra;
      this.onChangeBar({value: preferenciaBarra} as MatSelectChange);
    }
  }

  onChangeBar(event: MatSelectChange){
    if(event.value){
      StorageService.set(StorageService.BARRA_PREFERENCIAL, event.value);
    }
  }

  getPesoKg(item: any): number{
    return item.unidade == 'kg' ? item.peso : (item.peso / FunctionsNumberUtils.KG_TO_LB_BASE);
  }

  anilhasL(): Array<Anilha>{
    return this.anilhasKg.concat(this.anilhasLb).filter(anilha => anilha.quantidade > 0)
      .sort((a, b) =>
        FunctionsNumberUtils.getKg(a.peso,a.unidade=='lb') -
        FunctionsNumberUtils.getKg(b.peso,b.unidade=='lb'));
  }

  anilhasR(): Array<Anilha>{
    return this.anilhasKg.concat(this.anilhasLb).filter(anilha => anilha.quantidade > 0)
      .sort((a, b) =>
        FunctionsNumberUtils.getKg(b.peso,b.unidade=='lb') -
        FunctionsNumberUtils.getKg(a.peso,a.unidade=='lb'));
  }

  pesoTotalKg(): number{
    return this.anilhasL().reduce((total, anilha) =>
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
