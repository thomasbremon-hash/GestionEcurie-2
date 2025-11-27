import { Component, forwardRef, OnDestroy, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UtilisateurValidators } from '../../services/validators.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cheval-base',
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChevalBase),
      multi: true,
    },
  ],
  templateUrl: './cheval-base.html',
  styleUrl: './cheval-base.scss',
})
export class ChevalBase implements ControlValueAccessor, OnDestroy {
  chevalBaseForm = new FormGroup({
    nom: new FormControl('', [Validators.required, UtilisateurValidators.onlyLetters()]),
    dateNaissance: new FormControl('', [Validators.required]),
  });

  private destroy$ = new Subject<void>();
  private onChange!: (value: any) => void;
  private onTouched!: () => void;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: any): void {
    if (value) this.chevalBaseForm.patchValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
    this.chevalBaseForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => this.onChange(val));
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.chevalBaseForm.disable() : this.chevalBaseForm.enable();
  }

  markTouched() {
    if (this.onTouched) this.onTouched();
  }

  // Helper pour affichage d’erreurs dans le template
  getError(controlName: string): string | null {
    const control = this.chevalBaseForm.get(controlName);
    if (!control || !control.touched || !control.errors) return null;

    if (control.errors['required']) return 'Ce champ est requis.';
    if (control.errors['onlyLetters']) return 'Ce champ ne peut contenir que des lettres.';
    if (control.errors['emailInvalid']) return 'Adresse email invalide.';
    return null;
  }
}
