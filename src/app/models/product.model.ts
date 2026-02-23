export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}
