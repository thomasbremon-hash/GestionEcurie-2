export interface Entreprise {
  _id: string;
  nom: string;
  emailVerified?: boolean;
  email: string;
  rue: string;
  ville: string;
  cp: string;
  uid?: string;
  pays: string;
  siret: string;
  siren: string;
  telephone: string;
}
