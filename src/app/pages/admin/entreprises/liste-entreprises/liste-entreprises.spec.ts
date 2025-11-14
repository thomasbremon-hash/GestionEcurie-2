import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEntreprises } from './liste-entreprises';

describe('ListeEntreprises', () => {
  let component: ListeEntreprises;
  let fixture: ComponentFixture<ListeEntreprises>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeEntreprises]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeEntreprises);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
