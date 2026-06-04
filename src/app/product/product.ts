import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ProductService, Product } from '../services/inventory'; // Note the path change depending on your folder structure

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="store-container">
      <h2>Inventory Management</h2>
      
      <div class="add-form">
        <h3>Add New Inventory</h3>
        <input type="number" [(ngModel)]="newProduct.prodId" placeholder="Product ID" />
        <input type="text" [(ngModel)]="newProduct.prodName" placeholder="Product Name" />
        <input type="number" [(ngModel)]="newProduct.price" placeholder="Price (₹)" />
        <button (click)="submitProduct()">Add Item</button>
      </div>
      <hr>
      <ul *ngIf="products.length > 0; else noData">
        <li *ngFor="let product of products">
          <div class="item-info">
            <strong>{{product.prodId}}. </strong><strong>{{ product.prodName }}</strong> - ₹{{ product.price }}
          </div>
          <button class="delete-btn" (click)="removeProduct(product.prodId!)">Delete</button>
        </li>
      </ul>
      <ng-template #noData>
        <p>Store inventory is currently empty...</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .store-container { font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; }
    .add-form { background: #f4f4f4; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
    .add-form input { margin-right: 10px; padding: 5px; }
    li { display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #ccc; list-style: none; }
    .delete-btn { background: #ff4c4c; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px; }
  `]
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { prodId: 0, prodName: '', price: null as any };
  private productService = inject(ProductService);

  ngOnInit(): void { this.loadProducts(); }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => this.products = data);
  }

  submitProduct(): void {
    if (!this.newProduct.prodName || !this.newProduct.price) return; 
    this.productService.addProduct(this.newProduct).subscribe(() => {
      this.loadProducts(); 
      this.newProduct = {prodId: 0, prodName: '', price: null as any }; 
    });
  }

  removeProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }
}