import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Utilisateur } from './user';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  firestore = inject(Firestore);

  colllectionName = 'utilisateur';

  utilisateursRef = collection(this.firestore, this.colllectionName);

  utilisateurs = signal<Utilisateur[]>([]);
  utilisateurID = signal<string | null>(null);

  utilisateur = toSignal<Utilisateur>(from(this.getUser(this.utilisateurID()!)));

  usersResource = resource({
    loader: async (): Promise<Utilisateur[]> => {
      let documents: Utilisateur[] = [];
      (await getDocs(this.utilisateursRef)).forEach((document) => {
        documents.push(document.data() as Utilisateur);
      });
      return documents;
    },
  });

  users = computed(() => {
    console.log('Reloading users from resource');
    return this.usersResource.hasValue() ? this.usersResource.value() : [];
  });

  /* async fetchUtilisateurs() {
    const utilisateurs = await getDocs(this.utilisateursRef);
    this.utilisateurs.set(
      utilisateurs.docs.map((c) => ({
        ...c.data(),
        _id: c.id,
        prenom: c.data()['prenom'],
        nom: c.data()['nom'],
        email: c.data()['email'],
        displayName: c.data()['displayName'],
        rue: c.data()['rue'],
        ville: c.data()['ville'],
        cp: c.data()['cp'],
        dateNaissance: c.data()['dateNaissance'],
        uid: c.data()['uid'],
        pays: c.data()['pays'],
      }))
    );
  } */

  async getUser(id: string): Promise<Utilisateur> {
    const document = doc(this.utilisateursRef, id);
    const docsnap = await getDoc(document);

    return this.DataToUser(docsnap.data()!);
  }

  async addUser(newUser: Partial<Utilisateur>) {
    const docRef = await addDoc(this.utilisateursRef, newUser);
    await setDoc(docRef, { _id: docRef.id }, { merge: true });

    /*
    const document = doc(this.utilisateursRef, newUser._id);
    console.log(document.id);
    const docsnap = await getDoc(document);
    if (docsnap.exists()) {
      await setDoc(doc(this.utilisateursRef, newUser._id), newUser, { merge: true });
    } else {
      await setDoc(doc(this.utilisateursRef, newUser._id), newUser);
    }

  */
  }

  async updateUser(_id: string, newUser: Partial<Utilisateur>) {
    const docRef = doc(this.utilisateursRef, _id);
    await setDoc(docRef, newUser, { merge: true });
  }

  async deleteContact(id: string) {
    const docRef = doc(this.firestore, this.colllectionName, id);
    await deleteDoc(docRef);
  }

  userExits = computed(async () => {
    const document = doc(this.utilisateursRef, this.utilisateurID()!);
    const docsnap = await getDoc(document);
    return docsnap.exists() ? true : false;
  });

  DataToUser(data: any): Utilisateur {
    return {
      _id: data._id,
      prenom: data.prenom!,
      nom: data.nom!,
      displayName: data.displayName!,
      email: data.email!,
      emailVerified: data.emailVerified,
      adresse: {
        rue: data.adresse?.rue ?? '',
        cp: data.adresse?.cp ?? '',
        ville: data.adresse?.ville ?? '',
        pays: data.adresse?.pays ?? '',
      },
      dateNaissance: data.dateNaissance!,
      uid: data.uid,

      roles: data.roles ?? [],
    };
  }

  async emailExists(email: string): Promise<boolean> {
    const q = query(this.utilisateursRef, where('email', '==', email));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  }

  refreshUsers() {
    this.usersResource.reload(); // recharge la resource
  }
}
