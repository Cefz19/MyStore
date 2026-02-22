import { Component, OnInit, signal } from '@angular/core';


import { DatePipe } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { TimeAgoPipe } from '../../../pipes/time-ago-pipe';

import { Product } from '../../../models/product.model';
import { ProductComponent } from '../../products/product-component/product-component';
import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products-component',
  imports: [
    ProductComponent,
    // DatePipe,
    // UpperCasePipe,
    // TimeAgoPipe
  ],
  templateUrl: './products-component.html',
  styleUrls: ['./products-component.scss'],
})
export class ProductsComponent implements OnInit{
  myShoppingCart: Product[] = [];
  total = 0;
  products = signal<Product[]>([]);
  // products: Product[] = [
  //   {
  //     id: '1',
  //     title: 'El mejor libros',
  //     price: 565,
  //     image: 'assets/images/books.jpg',
  //     description: '',
  //     category: '',
  //   },
  //   {
  //     id: '2',
  //     title: 'Lentes casi nuevos',
  //     price: 356,
  //     image: 'assets/images/glasses.jpg',
  //     description: '',
  //     category: '',
  //   },
  //   {
  //     id: '3',
  //     title: 'Collecion de albunes',
  //     price: 565,
  //     image: 'assets/images/album.jpg',
  //     description: '',
  //     category: '',
  //   },
  //   {
  //     id: '4',
  //     title: 'La casa de ensueño',
  //     price: 1234,
  //     image: 'assets/images/house.jpg',
  //     description: '',
  //     category: '',
  //   },
  // ]

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit() {
    // this.storeService.products$.subscribe((data) => {
    //   this.products = data;
    //   console.log(data);
    // });
    // this.storeService.loaderProduct();

    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products.set(data);
      console.log('Productos cargados', this.products.length)
    })

    
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}

// myShoppingCart: Product[] = [];
//   total = 0;
//   products: Product[] = [];
//   today = new Date();
//   date = new Date(2026, 1, 21);
//   showProductDetail = false;

//   constructor(
//     private storeService: StoreService,
//     private productsService: ProductsService,
//   ) {
//     this.myShoppingCart = this.storeService.getShoppingCart();
//   }

//   ngOnInit() {
//     this.productsService.getAllProducts()
// .subscribe({
//   next: (products) => {
//     this.products = products;
//     console.log(products);
//   },
//   error: (err) => {
//     console.log(err);
//   },
//   complete: () => {}
// });
//   .subscribe(data => {
//     console.log(data);
//     this.products = data;
//   });
// }

// onAddToShoppingCart(product: Product) {
//   this.storeService.addProduct(product);
//   this.total = this.storeService.getTotal();

//   //Esto se mando al servicio para inyectarlo
//   // this.myShoppingCart.push(product);
//   // this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0)
// }

// toggleProductDetail() {
//   this.showProductDetail = !this.showProductDetail;
// }
