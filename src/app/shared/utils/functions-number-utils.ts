export class FunctionsNumberUtils{

  public static isValidNumber(value: any): boolean {
    return !isNaN(Number(value));
  }

  public static round(value: number, precision: number = 2): number {
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
  }

}
