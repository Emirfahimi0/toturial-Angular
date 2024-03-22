import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IProduct, IProducts } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  imports: [ProductComponent, CommonModule, PaginatorModule],
  selector: 'app-home',
  standalone: true,
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  products: IProduct[] = [];
  totalRecords: number = 0;
  rows: number = 5;
  constructor(private productService: ProductsService) {}

  onPageChange = (event: PaginatorState) => {
    const { page, rows } = event;
    this.fetchProducts(page ? page : 0, rows ? rows : 0);
  };

  fetchProducts = async (page: number, perPage: number) => {
    this.productService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe(
        ({ items, total }) => (
          (this.products = items), (this.totalRecords = total)
        ),
      );
  };

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
