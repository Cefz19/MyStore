import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { Location } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-detail.component',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailComponent {
  productId = signal<string | null>(null);
  product = signal<Product | null>(null);

  route = inject(ActivatedRoute);
  productService = inject(ProductsService);
  location = inject(Location);

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.productId.set(params.get('id'));
          const idValue = this.productId();
          if (idValue) {
            return this.productService.getOne(idValue);
          }
          return [null];
        }),
      )
      .subscribe((data) => {
        this.product.set(data);
      });
  }
  goToBack() {
    this.location.back();
  }
}
