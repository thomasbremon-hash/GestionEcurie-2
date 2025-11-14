import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class UtilisateurValidators {
  /** Vérifie si le champ est une adresse email valide */
  static emailValid(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      return emailRegex.test(value) ? null : { emailInvalid: true };
    };
  }

  /** Vérifie qu'une chaîne contient uniquement des lettres (ex: nom, prénom, ville) */
  static onlyLetters(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      return /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(value) ? null : { onlyLetters: true };
    };
  }

  /** Vérifie que le code postal est valide (5 chiffres FR, mais facilement adaptable) */
  static codePostal(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      return /^[0-9]{4,6}$/.test(value) ? null : { codePostalInvalid: true };
    };
  }
}
