import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { ProductsComponent } from '../../components/allproducts/products-component/products-component';

@Component({
  selector: 'app-category.component',
  imports: [ProductsComponent],
  template: `<app-products-component [products]="products()" (loadMore)="onLoadMore()" />`,
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  categoryId: string | null = null;
  products = signal<Product[]>([]);

  limit = 10;
  offset = 0;

  route = inject(ActivatedRoute);
  productService = inject(ProductsService);

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productService.getByCategory(this.categoryId, this.limit, this.offset);
          }
          return [];
        }),
      )
      .subscribe((data) => {
        this.products.set(data);
      });

    // .subscribe((params) => {
    //   this.categoryId = params.get('id');
    //   if (this.categoryId) {
    //     return this.productService.getByCategory(this.categoryId, this.limit, this.offset);
    //   }
    //   return []
    // })
  }

  onLoadMore() {
    if (this.categoryId) {
      this.productService
        .getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe((data) => {
          this.products.update((prev) => [...prev, ...data]);
          this.offset += this.limit;
        });
    }
  }
}
