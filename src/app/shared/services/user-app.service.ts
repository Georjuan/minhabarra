import {Injectable} from '@angular/core';
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {StorageService} from "./storage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserAppService {

  user: SocialUser | null = null;
  loggedIn: boolean = false;

  constructor(private authService: SocialAuthService,
              private router: Router) {
    if(StorageService.contains(StorageService.SESSION_USER)){
      this.setLogin(StorageService.get(StorageService.SESSION_USER) as SocialUser);
    }
    this.authService.authState.subscribe((user) => {
      if(user) this.setLogin(user);
    });
  }

  setLogin(_user: SocialUser | null) {
    this.user = _user;
    this.loggedIn = (_user != null);
    if(this.loggedIn) StorageService.set(StorageService.SESSION_USER, this.user);
  }

  logout() {
    StorageService.remove(StorageService.SESSION_USER);

    this.user = null;
    this.loggedIn = false;

    this.authService.signOut(true).then(
      () => this.router.navigate(['/pub/home/bar-manual'])
    );
  }

  public isLoggedIn(): boolean { return this.loggedIn && this.user!=null; }

  public getUser(): SocialUser {
    return this.user!=null ? this.user : new SocialUser();
  }

}
