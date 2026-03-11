import { Component, inject, signal } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProductsComponent } from '../../components/allproducts/products-component/products-component';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-home.component',
  imports: [ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  products = signal<Product[]>([]);
  limit = 10;
  offset = 0;
  productId = signal<string | null>(null);

  route = inject(ActivatedRoute)
  constructor(
    private productsService: ProductsService,
  ) {}

  ngOnInit() {
    this.onLoadMore();
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('product');
      this.productId.set(id) 
      console.log(id);
      
    })
    // this.productsService.getAllProducts().subscribe((data) => {
    // this.products.set(data);
    // });

    // this.productsService.getProductsByPage(10, 0).subscribe((data) => {
    // this.products.set(data);
    // this.offset = this.limit;
    // });
  }

  onLoadMore() {
    this.productsService.getAllProducts(this.limit, this.offset)
    .subscribe((data) => {
      this.products.update(prev => [...prev, ...data]);
      this.offset += this.limit;
    })
  }

  onDeleteProduct(id: number) {
    this.products.update(prev => prev.filter(p => p.id !== id));
  }

  onUpdateProduct(updated: Product){

  }
}
