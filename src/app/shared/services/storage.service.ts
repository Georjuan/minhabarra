export class StorageService {

  public static BARRA_PREFERENCIAL: string = "barra_preferencial";
  public static ANILHAS_OFF: string = "anilhas_off";
  public static SESSION_USER: string = "_socialUser";

  public static set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static remove(key: string): void {
    localStorage.removeItem(key);
  }

  public static get(key: string): unknown {
    return this.contains(key) ? JSON.parse(localStorage.getItem(key) as string) as unknown : null;
  }

  public static clear(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  public static contains(key: string): boolean {
    return localStorage.getItem(key) != null;
  }

}
