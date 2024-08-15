import {CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent} from "./app.component";
import {LayoutModule} from './layout/layout.module';
import {SharedModule} from './shared/shared.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {
  FacebookLoginProvider,
  GoogleInitOptions,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from '@abacritt/angularx-social-login';
import {environment} from "../environments/environment";
import {AppHttpInterceptor} from "./shared/services/security/http.interceptor";
import {UserAppService} from "./shared/services/user-app.service";

// https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
const fbLoginOptions = {
  scope: 'email,public_profile',
  return_scopes: true,
  enable_profile_selector: true
};

// https://developers.google.com/identity/oauth2/web/guides/use-token-model#initialize_a_token_client
const googleLoginOptions: GoogleInitOptions = {
  oneTapEnabled: false,
  scopes: ''
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FontAwesomeModule,
    SocialLoginModule
  ],
  providers:[
    provideHttpClient(withInterceptorsFromDi()),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    UserAppService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        lang: 'pt-BR',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.socialLogin.google.clientId, googleLoginOptions)
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.socialLogin.facebook.appId, fbLoginOptions)
          }
        ],
        onError: (err) => {console.error(err);}
      } as SocialAuthServiceConfig,
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
