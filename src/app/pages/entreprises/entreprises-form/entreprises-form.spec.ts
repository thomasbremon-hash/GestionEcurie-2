import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreprisesForm } from './entreprises-form';

describe('EntreprisesForm', () => {
  let component: EntreprisesForm;
  let fixture: ComponentFixture<EntreprisesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntreprisesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntreprisesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
