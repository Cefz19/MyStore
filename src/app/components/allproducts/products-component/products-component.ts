import { Component, OnInit, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';

import { DatePipe } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../../models/product.model';
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
  productChosen: Product | null = {
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
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
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
   

    // this.productsService.getAllProducts().subscribe((data) => {
    // this.products.set(data);
    // });

    this.productsService.getProductsByPage(10, 0).subscribe((data) => {
    this.products.set(data);
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
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productsService.getProdut(id)
    .subscribe({
      next: (data) => {
      this.productChosen = data;
      this.statusDetail = 'success';
    },
    error: (errorMeg) => {
      window.alert(errorMeg);
      this.statusDetail = 'error';
    }
    });
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: `New Product ${Date.now()}`,
      description: 'bla bla bla',
      images: ['https://placehold.co/600x400/transparent/F00'],
      price: 100,
      categoryId: 1,
    };

    this.productsService.create(product).subscribe((data) => {
      this.products.update((prevData) => [data, ...prevData]);
    });
  }

  updateProduct(changes: UpdateProductDTO) {
    if (!this.productChosen) return;

    const id = this.productChosen.id;

    // ABSTRACCIÓN:
    // Creamos el cuerpo de la petición combinando el producto actual con los cambios.
    // Esto asegura que NUNCA falten campos obligatorios (price, description, etc.)
    const dto: UpdateProductDTO = {
      ...this.productChosen, // 1. Esparcimos los datos actuales
      categoryId: this.productChosen.category.id, // 2. Mapeamos la categoría al ID
      ...changes, // 3. Sobrescribimos SOLO con los cambios nuevos
    };

    this.productsService.update(id, dto).subscribe({
      next: (updatedProduct) => {
        this.products.update((prev) => {
          const index = prev.findIndex((item) => item.id === id);
          const newArray = [...prev];
          newArray[index] = updatedProduct;
          return newArray;
        });
        this.productChosen = updatedProduct;
      },
      error: (err) => console.error('Error abstracto:', err.error),
    });
  }

  deleteProduct() {
    if(!this.productChosen) return;
    const id = this.productChosen.id;

    this.productsService.delete(id)
    .subscribe({
      next: () => {
        this.products.update((prev) => {
          return prev.filter(item => item.id !== id);
        });
        this.productChosen = null;
        this.showProductDetail = false;
        console.log('Product delete with successful');
      },
      error: (err) => console.error('Error delete: ', err.error),
    })
  }

  loadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
    this.products.set(data);
    this.offset += this.limit;
    });
  }
}
