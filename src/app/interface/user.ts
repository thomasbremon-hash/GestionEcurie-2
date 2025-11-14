export interface Utilisateur {
  _id: string;
  prenom: string;
  nom: string;
  displayName?: string;
  emailVerified?: boolean;
  email: string;
  rue: string;
  ville: string;
  cp: string;
  dateNaissance: string;
  uid?: string;
  pays: string;
}


