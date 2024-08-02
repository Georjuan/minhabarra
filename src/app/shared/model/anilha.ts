export class Anilha {

  peso: number = 0;
  unidade: string = '';
  cor: string = '#FFFFFF';
  tamanho: number = 0;
  quantidade: number = 0;
  disponivel: boolean = true;

  constructor(model: Anilha | any = {}) {
    this.peso = model!.peso || 0;
    this.unidade = model!.unidade || '';
    this.cor = model!.cor || '#FFFFFF';
    this.tamanho = model!.tamanho || 0;
    this.quantidade = model!.quantidade || 0;
    this.disponivel = model!.disponivel || true;
  }

  public equals(anilha: Anilha): boolean {
    return (this.peso == anilha.peso) && (this.unidade == anilha.unidade);
  }

  public isInList(anilhas: Array<Anilha>): boolean {
    return anilhas.some(_anilha => new Anilha(_anilha).equals(this));
  }

}
