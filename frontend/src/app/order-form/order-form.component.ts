import { Component } from '@angular/core';
import { OrderService, Order } from '../order.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput} from '@angular/material/datepicker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order.form',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatDatepicker,
    MatDatepickerInput,
    MatHint],
  standalone: true,
  templateUrl: './order-form.component.html',
})
export class OrderFormComponent {
  orderForm: FormGroup;
  errorMessage: string | undefined;

  constructor(private router: Router, private fb: FormBuilder, private orderService: OrderService) {
    this.orderForm = this.fb.group({
      orderNumber: ['', Validators.required],
      paymentDescription: ['', Validators.required],
      streetAddress: ['', Validators.required],
      town: ['', Validators.required],
      country: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      currency: ['', Validators.required],
      paymentDueDate: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.orderForm.invalid) {
      return;
    }
    const order: Order = this.orderForm.value;
    this.orderService.createOrder(order).subscribe({
      next: () => {
        alert('Order created successfully!');
        this.orderForm.reset();
        this.errorMessage = '';
        this.router.navigate(['/'])
      },
      error: (err) => {
        if (err.status === 409) { // Duplicate order number conflict
          this.errorMessage = 'Order number already exists.';
        } else {
          this.errorMessage = 'An error occurred while creating the order.';
        }
      },
    });
  }
}
