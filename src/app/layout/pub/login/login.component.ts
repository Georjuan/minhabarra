import {Component, OnInit} from '@angular/core';
import {FacebookLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {UserAppService} from "../../../shared/services/user-app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FunctionsStringUtils} from "../../../shared/utils/functions-string-utils";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private authService: SocialAuthService,
              private userApp: UserAppService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      let redirect: string = this.route.snapshot.paramMap.get('redirect') as string;
      if(FunctionsStringUtils.isBlank(redirect)){
        redirect = '/pub/home/bar-manual';
      }
      if(user) this.router.navigate([redirect]);
    });
  }

  signInFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  protected readonly Number = Number;
}
