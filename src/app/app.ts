import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './components/allproducts/products-component/products-component';
import { NavComponent } from './components/nav/nav-component/nav-component';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
@Component({
  selector: 'app-root',
  imports: [FormsModule, NavComponent, ProductsComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected readonly title = signal('my-store');

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  createUser() {
    this.usersService
      .create({
        name: 'Sebas',
        email: 'sebas@mail.com',
        password: '1212',
      })
      .subscribe((rta) => {
        console.log(rta);
      });
  }

  login() {
    this.authService.login('sebas@mail.com', '1212')
    .subscribe((rta) => {
      console.log(rta.access_token);
    });
  }

  // imgParent = '';
  // showImg = true;

  // onLoaded(img: string) {
  //   console.log('Loader father', img);
  // }
  // toggleImg() {
  //   this.showImg = !this.showImg;
  // }
}
