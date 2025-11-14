import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeChevaux } from './liste-chevaux';

describe('ListeChevaux', () => {
  let component: ListeChevaux;
  let fixture: ComponentFixture<ListeChevaux>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeChevaux]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeChevaux);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
