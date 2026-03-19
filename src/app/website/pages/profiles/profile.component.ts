import { Component, inject, ChangeDetectorRef } from '@angular/core';

import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { QuicklinkDirective } from 'ngx-quicklink';

@Component({
  selector: 'app-profile.component',
  imports: [QuicklinkDirective, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user: User | null = null;
  authService = inject(AuthService);
  cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    // this.authService.getProfile()
    this.authService.user$.subscribe((data) => {
      this.user = data;
      this.cdr.detectChanges();
    });
  }
}
