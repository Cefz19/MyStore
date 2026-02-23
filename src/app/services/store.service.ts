import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from './products.service';


@Injectable({
  providedIn: 'root',
})
export class StoreService {

  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);

  private products = new BehaviorSubject<Product[]>([]);
  products$ = this.products.asObservable()
  myCart$ = this.myCart.asObservable();

  constructor(
    private productsService: ProductsService,
  ){}

  loaderProduct(){
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products.next(data);
    })
  }

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
  
}
