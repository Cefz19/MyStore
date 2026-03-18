import { Component, inject } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-profile.component',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user: User | null = null;
  authService = inject(AuthService);

  ngOnInit() {
    this.authService.getProfile()
    .subscribe(data => {
      this.user = data
    })
  }
}
