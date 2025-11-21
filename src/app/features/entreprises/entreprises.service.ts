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
import { Entreprise } from './entreprise-data';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EntrepriseService {
  firestore = inject(Firestore);
  colllectionName = 'entreprise';

  entreprisesRef = collection(this.firestore, this.colllectionName);

  entreprises = signal<Entreprise[]>([]);
  entrepriseID = signal<string | null>(null);

  entreprise = toSignal<Entreprise>(from(this.getEntreprise(this.entrepriseID()!)));

  entreprisesResource = resource({
    loader: async (): Promise<Entreprise[]> => {
      let documents: Entreprise[] = [];
      (await getDocs(this.entreprisesRef)).forEach((document) => {
        documents.push(document.data() as Entreprise);
      });
      return documents;
    },
  });

  async getEntreprise(id: string): Promise<Entreprise> {
    const document = doc(this.entreprisesRef, id);
    const docsnap = await getDoc(document);

    return this.DataToEntreprise(docsnap.data()!);
  }

  async addEntreprise(newEntreprise: Partial<Entreprise>) {
    const docRef = await addDoc(this.entreprisesRef, newEntreprise);
    await setDoc(docRef, { _id: docRef.id }, { merge: true });
  }

  async updateEntreprise(_id: string, newEntreprise: Partial<Entreprise>) {
    const docRef = doc(this.entreprisesRef, _id);
    await setDoc(docRef, newEntreprise, { merge: true });
  }

  async deleteEntreprise(id: string) {
    const docRef = doc(this.firestore, this.colllectionName, id);
    await deleteDoc(docRef);
  }

  entrepriseExits = computed(async () => {
    const document = doc(this.entreprisesRef, this.entrepriseID()!);
    const docsnap = await getDoc(document);
    return docsnap.exists() ? true : false;
  });

  DataToEntreprise(data: any): Entreprise {
    return {
      _id: data._id,
      nom: data.nom!,
      email: data.email!,
      emailVerified: data.emailVerified,
      rue: data.rue!,
      ville: data.ville!,
      cp: data.cp!,
      uid: data.uid,
      pays: data.pays!,
      siret: data.siret,
      siren: data.siren,
      telephone: data.telephone,
    };
  }
  refreshEntreprises() {
    this.entreprisesResource.reload(); // recharge la resource
  }
}
