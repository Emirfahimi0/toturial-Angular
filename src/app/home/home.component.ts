import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IProduct, IProducts } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule, PaginatorState } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    ButtonModule,
    EditPopupComponent,
  ],
  selector: 'app-home',
  standalone: true,
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  products: IProduct[] = [];
  totalRecords: number = 0;
  rows: number = 5;

  @ViewChild('paginator') paginator: Paginator | undefined;
  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  onToggleEdit = (product: IProduct) => {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  };
  onToggleAdd = () => {
    this.displayAddPopup = true;
  };

  onToggleDelete = (product: IProduct) => {
    const { id } = product;
    if (id === undefined) return;
    this.handleDeleteProduct(id);
  };

  selectedProduct: IProduct = {
    id: 0,
    image: '',
    name: '',
    price: '',
    rating: 0,
  };

  onConfirmEdit = (product: IProduct) => {
    if (!this.selectedProduct.id) return;
    this.handleEditProduct(this.selectedProduct.id ?? 0, product);
    this.displayEditPopup = false;
  };

  onConfirmAdd = (product: IProduct) => {
    this.handleAddProduct(product);
    this.displayAddPopup = false;
  };

  constructor(private productService: ProductsService) {}

  onPageChange = (event: PaginatorState) => {
    const { page, rows } = event;
    this.fetchProducts(page ? page : 0, rows ? rows : 0);
  };

  onResetPage = () => {
    this.paginator?.changePage(0);
  };

  fetchProducts = (page: number, perPage: number) => {
    this.productService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: ({ items, total }) => {
          this.products = items;
          this.totalRecords = total;
        },
        error: (err) => {
          console.log(err);
        },
      });
  };

  handleAddProduct = (item: IProduct) => {
    const url = 'http://localhost:3000/clothes';
    this.productService.addProduct(url, item).subscribe({
      next: () => {
        this.fetchProducts(0, this.rows);
        this.onResetPage();
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  handleEditProduct = (id: number, product: IProduct) => {
    const url = `http://localhost:3000/clothes/${id}`;
    this.productService.editProduct(url, product).subscribe({
      next: (data) => {
        console.log(data);
        this.onResetPage();
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  handleDeleteProduct = (id: number) => {
    const url = `http://localhost:3000/clothes/${id}`;
    this.productService.removeProduct(url).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
        this.onResetPage();
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
