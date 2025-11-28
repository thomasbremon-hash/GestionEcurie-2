import { Adresse } from '../adresseForm/adresse-interface';

export interface Utilisateur {
  _id: string;
  prenom: string;
  nom: string;
  displayName?: string;
  emailVerified?: boolean;
  email: string;
  dateNaissance: string;
  uid?: string;
  roles: string[];
  adresse: Adresse;
}
