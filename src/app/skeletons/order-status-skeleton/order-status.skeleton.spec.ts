import { ComponentFixture, TestBed } from '@angular/core/testing';

import {OrderStatusSkeleton} from './order-status.skeleton';

describe('OrderStatusSkeleton', () => {
  let component: OrderStatusSkeleton;
  let fixture: ComponentFixture<OrderStatusSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStatusSkeleton ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
