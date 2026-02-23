import { Component, OnInit, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';

import { DatePipe } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';

import { CreateProductDTO, Product } from '../../../models/product.model';
import { ProductComponent } from '../../products/product-component/product-component';
import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products-component',
  imports: [
    CommonModule,
    ProductComponent,
    // DatePipe,
    // UpperCasePipe,
    // TimeAgoPipe
  ],
  templateUrl: './products-component.html',
  styleUrls: ['./products-component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  products = signal<Product[]>([]);
  showProductDetail = false;
  productChosen: Product = {
    id: 0,
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: 0,
      name: '',
    },
  };
  today = new Date();
  date = new Date(2026, 1, 21);
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

    this.productsService.getAllProducts().subscribe((data) => {
      this.products.set(data);
      console.log('Productos cargados', this.products.length);
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: number) {
    this.productsService.getProdut(id).subscribe((data) => {
      this.toggleProductDetail();
      this.productChosen = data;
    });
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: `New Product ${Date.now()}`,
      description: 'bla bla bla',
      images: ['https://placeimg.com/640/480/any'],
      price: 100,
      categoryId: 1,
    };

    this.productsService.create(product).subscribe(data => {
      this.products.update(prevData => [data, ... prevData])
    });
  }
}
