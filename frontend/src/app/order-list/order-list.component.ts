import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../order.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgForOf } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    DatePipe,
    MatFormField,
    MatCardHeader,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle,
    MatLabel,
    MatInput,
  ],
  standalone: true
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  filterForm: FormGroup;

  constructor(private orderService: OrderService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      country: [''],
      description: [''],
    });
  }

  ngOnInit() {
    this.loadOrders();
    // Reload orders whenever filters change.
    this.filterForm.valueChanges.subscribe(() => {
      this.loadOrders();
    });
  }

  loadOrders() {
    const { country, description } = this.filterForm.value;
    this.orderService.getOrders(country, description).subscribe({
      next: (orders) => (this.orders = orders),
      error: (err) => console.error(err),
    });
  }
}
