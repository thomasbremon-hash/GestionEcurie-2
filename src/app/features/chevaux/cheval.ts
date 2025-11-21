import { signal } from '@angular/core';
import { form } from '@angular/forms/signals';

interface chevalData {
  nom: string;
  dateNaissance: string;
}
export class LoginComponent {
  chevalModel = signal<chevalData>({
    nom: '',
    dateNaissance: '',
  });
  chevalForm = form(this.chevalModel);
}
