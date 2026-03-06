import { Component } from '@angular/core';
import { ProductsComponent } from "../../components/allproducts/products-component/products-component";

@Component({
  selector: 'app-home.component',
  imports: [ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

}
