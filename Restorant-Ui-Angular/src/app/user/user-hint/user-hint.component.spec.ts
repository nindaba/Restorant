import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHintComponent } from './user-hint.component';

describe('UserHintComponent', () => {
  let component: UserHintComponent;
  let fixture: ComponentFixture<UserHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
