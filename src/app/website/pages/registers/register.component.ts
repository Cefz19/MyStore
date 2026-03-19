import { Component } from '@angular/core';

import { OnExit } from '../../../guards/exit-guard';

@Component({
  selector: 'app-register.component',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  onExit() {
    const rta = confirm('Logic desde el comp, estas seguro de salir')
    return rta;
  }
}
