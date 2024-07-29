import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  appTitle: string = environment.appProperties.title;
  // contactEmail: string = environment.appProperties.contactEmail;
  ownerPageLink: string = environment.appProperties.ownerPageLink;
  ownerPageTitle: string = environment.appProperties.ownerPageTitle;
  // contactDefaultSubject: string = environment.appProperties.contactDefaultSubject;
  // contactDefaultBody: string = environment.appProperties.contactDefaultBody;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  isMobile= true;
  isCollapsed = true;

  constructor(private observer: BreakpointObserver) {}

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
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
