import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../models/product.model';
import { ImgComponent } from "../../img-componet/img-component";

import { HighlightDirective } from '../../../directive/highlight.directive';

@Component({
  selector: 'app-product-component',
  imports: [
    ImgComponent,
    CurrencyPipe,
    // HighlightDirective
  ],
  templateUrl: './product-component.html',
  styleUrls: ['./product-component.scss'],
})
export class ProductComponent {
  @Input() product: Product = {
    id: 0,
    title: '',
    price: 0,
    // description: '',
    // category: {
    //   id: 0,
    //   name: '',
    // },
    image: '',
    description: '',
    category: '',
  };
  @Output() addedProduct = new EventEmitter<Product>();

  
  onAddToCart() {
    this.addedProduct.emit(this.product);
  }
}
