import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  id: string;
  orderNumber: string;
  paymentDescription: string;
  streetAddress: string;
  town: string;
  country: string;
  amount: number;
  currency: string;
  paymentDueDate: string; // ISO string format
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders'; // Adjust if needed

  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  getOrders(country?: string, description?: string): Observable<Order[]> {
    let params = new HttpParams();
    if (country) {
      params = params.set('country', country);
    }
    if (description) {
      params = params.set('description', description);
    }
    return this.http.get<Order[]>(this.apiUrl, { params });
  }
}
