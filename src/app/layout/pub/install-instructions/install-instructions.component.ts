import { Component } from '@angular/core';
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";

@Component({
  selector: 'app-install-instructions',
  templateUrl: './install-instructions.component.html',
  styleUrl: './install-instructions.component.scss'
})
export class InstallInstructionsComponent {

  protected readonly faBars = faBars;
  protected readonly faEllipsisVertical = faEllipsisVertical;
}
