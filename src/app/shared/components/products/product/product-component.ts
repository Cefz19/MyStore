import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  output,
  input,
  inject,
} from '@angular/core';

import { ReversePipe } from '../../../pipe/reverse.pipe';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../../models/product.model';
import { ImgComponent } from '../../img-componet/img-component';

import { HighlightDirective } from '../../../directives/highlight.directive';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-component',
  imports: [
    ImgComponent,
    // ReversePipe,
    CurrencyPipe,
    RouterLink,
  ],
  templateUrl: './product-component.html',
  styleUrls: ['./product-component.scss'],
})
export class ProductComponent {
  product = input.required<Product>();

  addedProduct = output<Product>();
  showProduct = output<number>();

  productId = signal<number | null>(null);
  route = inject(ActivatedRoute);

  ngOnInit() {
    // 2. Escucha la URL y actualiza la señal
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('product');
      // 3. SOLO si existe el ID en la URL, lo convertimos y seteamos
      if (id) {
        this.productId.set(Number(id));
      } else {
        this.productId.set(null); // Si no hay param, el ID es null
      }
    });
  }

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
    this.showProduct.emit(this.product().id);
  }
}
