export class Anilha {

  peso: number = 0;
  unidade: string = '';
  cor: string = '#FFFFFF';
  tamanho: number = 0;
  quantidade: number = 0;

  constructor(model: Anilha | any = {}) {
    this.peso = model!.peso || 0;
    this.unidade = model!.unidade || '';
    this.cor = model!.cor || '#FFFFFF';
    this.tamanho = model!.tamanho || 0;
    this.quantidade = model!.quantidade || 0;
  }

}
