import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail.component',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  productId = signal<string | null>(null);
  product = signal<Product | null>(null);

  route = inject(ActivatedRoute);
  productService = inject(ProductsService)
  
  ngOnInit() {
     this.route.paramMap
          .pipe(
            switchMap((params) => {
              this.productId.set(params.get('id'));
              const idValue = this.productId()
              if (idValue) {
                return this.productService.getOne(Number(idValue));
              }
              return [null];
            }),
          )
          .subscribe((data) => {
            this.product.set(data);
          });
    
  }
}
