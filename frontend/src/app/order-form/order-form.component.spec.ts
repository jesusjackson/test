import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideLocationMocks } from '@angular/common/testing';
import { OrderFormComponent } from './order-form.component';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OrderFormComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
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

    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render form title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Create Order');
  });

  it('should have disabled submit button initially', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTrue();
  });

  it('should enable submit button when form is valid', () => {
    component.orderForm.setValue({
      orderNumber: '123',
      paymentDescription: 'Test payment',
      streetAddress: '123 Main St',
      town: 'Testville',
      country: 'Testland',
      amount: 100,
      currency: 'USD',
      paymentDueDate: new Date(),
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalse();
  });

  it('should display error message if exists', () => {
    component.errorMessage = 'An error occurred';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const errorMsg = compiled.querySelector('.error-message') as HTMLElement;
    expect(errorMsg.textContent).toContain('An error occurred');
  });
});
