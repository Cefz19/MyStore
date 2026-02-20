import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ProductsComponent } from "./components/allproducts/products-component/products-component";
import { NavComponent } from "./components/nav/nav-component/nav-component";
@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    NavComponent,
    ProductsComponent,
    RouterOutlet
],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected readonly title = signal('my-store');

  // imgParent = '';
  // showImg = true;

  // onLoaded(img: string) {
  //   console.log('Loader father', img);
  // }
  // toggleImg() {
  //   this.showImg = !this.showImg;
  // }
}
