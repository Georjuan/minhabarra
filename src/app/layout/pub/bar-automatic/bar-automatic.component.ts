import {Component, ElementRef, OnInit, signal, ViewChild} from '@angular/core';
import {Barra} from "../../../shared/model/barra";
import {Anilha} from "../../../shared/model/anilha";
import {FunctionsNumberUtils} from "../../../shared/utils/functions-number-utils";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {MatSelectChange} from "@angular/material/select";
import {ActivatedRoute} from "@angular/router";
import {FunctionsStringUtils} from "../../../shared/utils/functions-string-utils";
import {StorageService} from "../../../shared/services/storage.service";

@Component({
  selector: 'app-bar-automatic',
  templateUrl: './bar-automatic.component.html',
  styleUrl: './bar-automatic.component.scss'
})
export class BarAutomaticComponent implements OnInit {
  protected readonly FunctionsNumberUtils = FunctionsNumberUtils;

  barras: Array<Barra> = new Array<Barra>();
  anilhasKg: Array<Anilha> = new Array<Anilha>();
  anilhasLb: Array<Anilha> = new Array<Anilha>();

  barImage: String = "url(resources/images/bar.png)";

  //Weight in kg
  barWeight: number = 20;

  weight: number = 0;

  @ViewChild('inputWight') inputWight: ElementRef<HTMLInputElement> | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    let _weight: string | null = this.route.snapshot.paramMap.get('weight');

    FunctionsStringUtils.isNotBlank(_weight) ?
      this.weight = parseFloat(_weight as string) : this.weight = 0;

    if(this.weight > 0){
      if(this.weight < FunctionsNumberUtils.getLb(this.barWeight))
        this.weight = FunctionsNumberUtils.round(FunctionsNumberUtils.getLb(this.barWeight));
    }

    fetch('resources/data/anilhas-kg.json').then(res => res.json())
      .then(json => {
        this.anilhasKg = json as Array<Anilha>;
        this.anilhasKg.forEach(anilha => {anilha.quantidade = 0; anilha.disponivel = true;});
        this.anilhasKg = this.anilhasKg.sort((a, b) => b.peso - a.peso);

        fetch('resources/data/anilhas-lb.json').then(res => res.json())
          .then(json => {
            this.anilhasLb = json as Array<Anilha>;
            this.anilhasLb.forEach(anilha => {anilha.quantidade = 0; anilha.disponivel = true;});
            this.anilhasLb = this.anilhasLb.sort((a, b) => b.peso - a.peso);

            fetch('resources/data/barras.json').then(res => res.json())
              .then(json => {
                this.barras = json as Array<Barra>;
                this.barras = this.barras.sort((a, b) => this.getPesoKg(b) - this.getPesoKg(a));

                this.selectPreferencia();
                this.mount();
              });
          });
      });
  }

  selectPreferencia(){
    if(StorageService.contains(StorageService.BARRA_PREFERENCIAL)){
      let preferenciaBarra: number = StorageService.get(StorageService.BARRA_PREFERENCIAL) as number;
      this.barWeight = preferenciaBarra;
      this.onChangeBar({value: preferenciaBarra} as MatSelectChange);
    }

    //Deixa desmarcado todas as anilhas que estiverem indisponíveis em estoque salvas no local storage
    if(StorageService.contains(StorageService.ANILHAS_OFF)){
      let anilhasOff: Array<Anilha> = StorageService.get(StorageService.ANILHAS_OFF) as Array<Anilha>;

      this.anilhasLb.forEach(anilha => {
        if(new Anilha(anilha).isInList(anilhasOff)) anilha.disponivel = false;
      });

      this.anilhasKg.forEach(anilha => {
        if(new Anilha(anilha).isInList(anilhasOff)) anilha.disponivel = false;
      });
    }
  }

  getPesoKg(item: any): number{
    return item.unidade == 'kg' ? item.peso : (item.peso / FunctionsNumberUtils.KG_TO_LB_BASE);
  }

  anilhasL(): Array<Anilha>{
    return this.anilhasKg.concat(this.anilhasLb).filter(anilha => anilha.quantidade > 0 && anilha.disponivel)
                .sort((a, b) =>
                  FunctionsNumberUtils.getKg(a.peso,a.unidade=='lb') -
                  FunctionsNumberUtils.getKg(b.peso,b.unidade=='lb'));
  }

  anilhasR(): Array<Anilha>{
    return this.anilhasKg.concat(this.anilhasLb).filter(anilha => anilha.quantidade > 0 && anilha.disponivel)
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

  onAjustarPesoMinimo():void{
    this.weight = FunctionsNumberUtils.getKg(this.weight, this.lbUnit()) < this.barWeight ?
      (this.lbUnit() ? FunctionsNumberUtils.round(FunctionsNumberUtils.getLb(this.barWeight)) : this.barWeight) :
      this.weight;
  }

  onFocusout(event: FocusEvent): void {
    this.onAjustarPesoMinimo();
  }

  onKeydown(event: KeyboardEvent): void {
    if(['Enter', 'NumpadEnter', 'Tab'].includes(event.key)){
      if(this.inputWight) this.inputWight.nativeElement.blur();
      this.onAjustarPesoMinimo();
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
    this.mount();
  }

  onChangeAnilha(event: MatSlideToggleChange, anilha: Anilha): void {
    //Atualiza a lista de anilha indisponíveis em estoque no local storage
    let anilhasOff: Array<Anilha> = StorageService.get(StorageService.ANILHAS_OFF) as Array<Anilha>;
    if(!anilhasOff) anilhasOff = new Array<Anilha>();
    if(event.checked){
      anilhasOff = anilhasOff.filter(_anilha => !new Anilha(_anilha).equals(anilha));
    }else{
      anilhasOff = anilhasOff.concat(anilha);
    }
    StorageService.set(StorageService.ANILHAS_OFF, anilhasOff);

    //Chama a montagem de barra
    this.mount();
  }

  onChangeBar(event: MatSelectChange){
    this.onAjustarPesoMinimo();
    this.mount();
    if(event.value){
      StorageService.set(StorageService.BARRA_PREFERENCIAL, event.value);
    }
  }

  lbUnit = signal(true);
  changeUnitEvent(event: MouseEvent) {
    this.lbUnit.set(!this.lbUnit());
    event.stopPropagation();
    this.mount();
  }

  limpar(): void{
    this.anilhasKg.forEach(anilha => anilha.quantidade = 0);
    this.anilhasLb.forEach(anilha => anilha.quantidade = 0);
  }

  mount(): void{
    this.limpar();

    //Filtra somente as anilhas disponíveis
    let anilhas: Array<Anilha> = this.anilhasLb.filter(anilha => anilha.disponivel).concat(this.anilhasKg.filter(anilha => anilha.disponivel));

    //Ordena as anilhas
    anilhas = anilhas.sort((a, b) =>
      FunctionsNumberUtils.getKg(b.peso,b.unidade=='lb') -
      FunctionsNumberUtils.getKg(a.peso,a.unidade=='lb'));

    //Em kg
    const pesoTotal = this.lbUnit() ? FunctionsNumberUtils.getKg(this.weight) : this.weight;

    //Em kg
    const pesoAnilhas = (pesoTotal - this.barWeight) / 2;

    //Em kg
    let pesoSomado: number = 0;

    anilhas.forEach(anilha => {
      if(pesoSomado < pesoAnilhas){
        const pesoAnilha: number = FunctionsNumberUtils.getKg(anilha.peso, anilha.unidade=='lb');

        //Se o peso da anilha for maior que o peso necessário para completar a barra, pula para a proxima
        if(pesoAnilha > pesoAnilhas) return;

        while(true){
          //Se incluir esta anilha ultrapassar o peso necessário, pula para a proxima
          if((pesoAnilha + pesoSomado) > pesoAnilhas) break;

          //Adiciona anilha no total
          pesoSomado += pesoAnilha;
          this.add(anilha);
        }
      }
    });
  }

}
