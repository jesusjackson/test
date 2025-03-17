import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideLocationMocks } from '@angular/common/testing';
import { OrderListComponent } from './order-list.component';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OrderListComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
      ],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        provideHttpClient(withFetch()),
        provideMomentDateAdapter({
          parse: {
            dateInput: ["MM-DD-YYYY"],
          },
          display: {
            dateInput: "DD-MM-YYYY",
            monthYearLabel: 'MMM YYYY',
            dateA11yLabel: 'LL',
            monthYearA11yLabel: 'MMMM YYYY',
          },
        })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;

    component.orders = [
      {
        orderNumber: '123',
        paymentDescription: 'Test payment',
        streetAddress: '123 Main St',
        town: 'Testville',
        country: 'Testland',
        amount: 100,
        currency: 'USD',
        paymentDueDate: new Date().toISOString(),
        id: '',
      },
    ];

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render filters correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const filterCountry = compiled.querySelector('input[formControlName="country"]');
    const filterDescription = compiled.querySelector('input[formControlName="description"]');

    expect(filterCountry).toBeTruthy();
    expect(filterDescription).toBeTruthy();
  });

  it('should display order details', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card-subtitle')?.textContent).toContain('Test payment');
    expect(compiled.querySelector('mat-card-content')?.textContent).toContain('123 Main St');
    expect(compiled.querySelector('mat-card-content')?.textContent).toContain('Testville');
    expect(compiled.querySelector('mat-card-content')?.textContent).toContain('Testland');
    expect(compiled.querySelector('mat-card-content')?.textContent).toContain('100 USD');
  });

  it('should render cards based on orders length', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('mat-card');
    expect(cards.length).toBe(1);
  });
});
