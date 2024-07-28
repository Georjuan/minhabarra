export class KgLb{

  kg: number = 0;
  lb: number = 0;

  constructor(model: KgLb | any = {}) {
    this.kg = model!.kg || 0;
    this.lb = model!.lb || 0;
  }

}
