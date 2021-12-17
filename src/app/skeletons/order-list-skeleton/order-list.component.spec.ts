import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListSkeletonComponent } from './order-list.component';

describe('OrderListSkeletonComponent', () => {
  let component: OrderListSkeletonComponent;
  let fixture: ComponentFixture<OrderListSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
