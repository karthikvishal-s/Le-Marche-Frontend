import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer, CustomerService } from '../services/customers';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="store-container">
      <h2>Customer Details</h2>
      
      <div class="add-form">
        <h3>Add New Customer</h3>
        <input type="number" [(ngModel)]="newCustomer.custId" placeholder="Customer ID" />
        <input type="text" [(ngModel)]="newCustomer.custName" placeholder="Customer Name" />
        <input type="text" [(ngModel)]="newCustomer.custStatus" placeholder="Status" />
        <button (click)="submitCustomer()">Add Customer</button>
      </div>
      <hr>
      <ul *ngIf="customers.length > 0; else noData">
        <li *ngFor="let customer of customers">
          <div class="item-info">
            <strong>{{customer.custId}}. </strong><strong>{{ customer.custName }}</strong> - {{ customer.custStatus }}
          </div>
          <button class="delete-btn" (click)="removeCustomer(customer.custId!)">Delete</button>
        </li>
      </ul>
      <ng-template #noData>
        <p>Customer database is currently empty...</p>
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
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  newCustomer: Customer = { custId: 0, custName: '', custStatus: null as any };
  private customerService = inject(CustomerService);

  ngOnInit(): void { this.loadCustomers(); }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((data) => this.customers = data);
  }

  submitCustomer(): void {
    if(!this.newCustomer.custId || !this.newCustomer.custName) return;
    this.customerService.addCustomer(this.newCustomer).subscribe(() => {
      this.loadCustomers();
      this.newCustomer = { custId: 0, custName: '', custStatus: '' };
    });
  }

  removeCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe(() => this.loadCustomers());
  }
}