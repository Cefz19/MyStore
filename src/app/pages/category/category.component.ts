import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { ProductsComponent } from '../../components/allproducts/products-component/products-component';

@Component({
  selector: 'app-category.component',
  imports: [ProductsComponent],
  templateUrl: './category.component.html',
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
    .subscribe((params) => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this.productService
          .getByCategory(this.categoryId, this.limit, this.offset)
          .subscribe((data) => {
            this.products.set(data);
          });
      }
    });
  }
}
