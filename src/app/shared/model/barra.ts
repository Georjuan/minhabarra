export class Barra {

  peso: number = 0;
  unidade: string = '';

  constructor(model: Barra | any = {}) {
    this.peso = model!.peso || 0;
    this.unidade = model!.unidade || '';
  }

}
