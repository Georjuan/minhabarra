export class FunctionsNumberUtils{

  public static KG_TO_LB_BASE: number = 2.20462;

  public static isValidNumber(value: any): boolean {
    return !isNaN(Number(value));
  }

  public static round(value: number, precision: number = 2): number {
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
  }

  public static getKg(weight: number, lbUnit: boolean = true): number {
    return !lbUnit ? weight : weight / FunctionsNumberUtils.KG_TO_LB_BASE;
  }

  public static getLb(weight: number, kgUnit: boolean = true): number {
    return !kgUnit ? weight : weight * FunctionsNumberUtils.KG_TO_LB_BASE;
  }

}
