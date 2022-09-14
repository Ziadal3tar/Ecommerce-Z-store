import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOnAllComponent } from './cart-on-all.component';

describe('CartOnAllComponent', () => {
  let component: CartOnAllComponent;
  let fixture: ComponentFixture<CartOnAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartOnAllComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartOnAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
