import { Adresse } from '../adresseForm/adresse-interface';

export interface Utilisateur {
  _id: string;
  prenom: string;
  nom: string;
  displayName?: string;
  emailVerified?: boolean;
  email: string;
  // rue: string;
  // ville: string;
  // cp: string;
  // pays: string;
  dateNaissance: string;
  uid?: string;
  roles: string[];
  adresse: Adresse;
}
