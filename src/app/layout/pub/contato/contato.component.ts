import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.scss'
})
export class ContatoComponent implements OnInit {
  contactEmail: string = environment.appProperties.contactEmail;
  contactDefaultSubject: string = environment.appProperties.contactDefaultSubject;
  contactDefaultBody: string = environment.appProperties.contactDefaultBody;

  constructor() { }

  ngOnInit(): void {
    window.location.href = `mailto:${this.contactEmail}?subject=${this.contactDefaultSubject}&body=${this.contactDefaultBody}`;
  }

}
