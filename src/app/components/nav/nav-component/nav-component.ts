import { Component, OnInit, signal } from '@angular/core';
import { StoreService } from '../../../services/store.service';
// import { NgClass } from "../../../../../node_modules/@angular/common/types/_common_module-chunk";

import { AuthService } from '../../../services/auth.service';

import { User } from '../../../models/user.model';
@Component({
  selector: 'app-nav-component',
  imports: [
    // NgClass
  ],
  templateUrl: './nav-component.html',
  styleUrls: ['./nav-component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = signal(false);
  counter = 0;

  // token = signal('');
  profile = signal<User | null>(null);
  // token = '';
  // profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu.update((prevState) => !prevState);
  }

  login() {
    this.authService.loginAndGet('sebas@mail.com', '1212')
    .subscribe({
      next: (user) => {
        this.profile.set(user)
      },
      error: (err) =>  {
        console.error('Error in the login o profile', err);
      }
    }
      // this.token.set(rta.access_token)
      // console.log(this.token);
      // this.token = rta.access_token;
      // console.log('Token recibido:', )
      // this.getProfile()
    );
  }

  getProfile() {
    this.authService.getProfile()
    .subscribe(user => {
      this.profile.set(user);
    });
  }
}
