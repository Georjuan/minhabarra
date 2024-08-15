import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {environment} from "../../../../environments/environment";
import packageJson from "../../../../../package.json";
import {SocialUser} from "@abacritt/angularx-social-login";
import {UserAppService} from "../../services/user-app.service";
import {SharedModule} from "../../shared.module";
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [SharedModule, RouterLink, NgOptimizedImage],
})
export class HomeComponent implements OnInit {
  version: string = packageJson.version;

  appTitle: string = environment.appProperties.title;
  ownerPageLink: string = environment.appProperties.ownerPageLink;
  ownerPageTitle: string = environment.appProperties.ownerPageTitle;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  isMobile= true;
  isCollapsed = true;

  constructor(private observer: BreakpointObserver,
              private userAppService: UserAppService) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      this.isMobile = screenSize.matches;
    });
  }

  closeMenu(): void {
    this.sidenav.close();
    this.isCollapsed = true;
  }

  toggleMenu(): void {
    this.sidenav.open();
    this.isCollapsed = !this.isCollapsed;
  }

  signOut(): void {
    this.closeMenu();
    this.userAppService.logout();
  }

  isLogged(): boolean {
    return this.userAppService.isLoggedIn();
  }

  user(): SocialUser{
    return this.userAppService.getUser();
  }

}
