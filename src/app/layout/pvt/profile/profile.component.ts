import {Component, OnInit} from '@angular/core';
import {SocialUser} from "@abacritt/angularx-social-login";
import {UserAppService} from "../../../shared/services/user-app.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  constructor(private userApp: UserAppService) { }

  ngOnInit() {

  }

  get user(): SocialUser {
    return this.userApp.getUser();
  }

}
