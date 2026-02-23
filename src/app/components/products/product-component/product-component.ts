import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ReversePipe } from '../../../pipes/reverse.pipe';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../models/product.model';
import { ImgComponent } from "../../img-componet/img-component";

import { HighlightDirective } from '../../../directive/highlight.directive';

@Component({
  selector: 'app-product-component',
  imports: [
    ImgComponent,
    // ReversePipe,
    CurrencyPipe,
    HighlightDirective
  ],
  templateUrl: './product-component.html',
  styleUrls: ['./product-component.scss'],
})
export class ProductComponent {
  @Input() product: Product = {
    id: 0,
    title: '',
    price: 0,
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
