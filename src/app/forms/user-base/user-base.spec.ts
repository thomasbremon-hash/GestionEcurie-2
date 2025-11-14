import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBase } from './user-base';

describe('UserBase', () => {
  let component: UserBase;
  let fixture: ComponentFixture<UserBase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
