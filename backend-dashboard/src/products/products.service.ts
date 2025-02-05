import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Producto A', price: 100, stock: 20 },
    { id: 2, name: 'Producto B', price: 200, stock: 15 },
    { id: 3, name: 'Producto C', price: 50, stock: 40 },
    { id: 4, name: 'Producto D', price: 150, stock: 10 },
    { id: 5, name: 'Producto E', price: 300, stock: 5 },
  ];
  create(createProductDto: CreateProductDto) {
    const newProduct = {
      ...createProductDto,
      id: Date.now(),
    };

    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new HttpException(
        `product with  ID: ${id}  not found on database`,
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    this.products = this.products.map((product) => {
      if (product.id === id) {
        return { ...product, ...updateProductDto };
      }
      return product;
    });
    return this.findOne(id);
  }

  remove(id: number) {
    const toBeRemoved = this.findOne(id);

    this.products = this.products.filter((product) => product.id !== id);

    return toBeRemoved;
  }
}
