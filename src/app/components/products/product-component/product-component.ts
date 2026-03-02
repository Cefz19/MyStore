import { Component, Input, Output, EventEmitter, signal, output, input } from '@angular/core';

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
    // HighlightDirective
  ],
  templateUrl: './product-component.html',
  styleUrls: ['./product-component.scss'],
})
export class ProductComponent {

  product = input.required<Product>();

  addedProduct = output<Product>();
  showProduct = output<number>();

  // @Input() product: Product = {
  //   id: 0,
  //   title: '',
  //   price: 0,
    // category: {
    //   id: 0,
    //   name: '',
    // },
  //   images: [],
  //   description: '',
  //   category: {
  //     id: 0,
  //     name: '',
  //   },
  // };
  // @Output() addedProduct = new EventEmitter<Product>();
  // @Output() showProduct = new EventEmitter<number>();

  
  onAddToCart() {
    this.addedProduct.emit(this.product());
  }

  onShowDetail() {
    this.showProduct.emit(this.product().id)
  }
}
