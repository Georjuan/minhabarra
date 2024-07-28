export class FunctionsStringUtils{

  public static isNotBlank(value: string | null): boolean {
    return value != null && value.trim().length > 0;
  }

  public static isBlank(value: string | null): boolean {
    return !this.isNotBlank(value);
  }

}
