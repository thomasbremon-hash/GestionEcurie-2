import { Adresse } from '../adresseForm/adresse-interface';

export interface Entreprise {
  _id: string;
  nom: string;
  emailVerified?: boolean;
  email: string;
  uid?: string;
  siret: string;
  siren: string;
  telephone: string;
  adresse: Adresse;
}
