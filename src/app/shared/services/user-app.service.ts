import {Injectable, OnInit} from '@angular/core';
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class UserAppService implements OnInit{

  user: SocialUser | null = null;
  loggedIn: boolean = false;

  constructor(private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  public isLoggedIn(): boolean { return this.loggedIn && this.user!=null; }

  public getUser(): SocialUser {
    return this.user!=null ? this.user : new SocialUser();
  }

}
