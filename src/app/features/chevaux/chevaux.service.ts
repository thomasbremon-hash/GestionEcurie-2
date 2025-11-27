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
import { Cheval } from './cheval';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ChevalService {
  firestore = inject(Firestore);
  colllectionName = 'cheval';

  chevauxRef = collection(this.firestore, this.colllectionName);

  chevaux = signal<Cheval[]>([]);
  chevalID = signal<string | null>(null);

  cheval = computed(() => {
    const id = this.chevalID();
    if (!id) return null;
    return toSignal(from(this.getCheval(id)))();
  });

  chevauxResource = resource({
    loader: async (): Promise<Cheval[]> => {
      let documents: Cheval[] = [];
      (await getDocs(this.chevauxRef)).forEach((document) => {
        documents.push(document.data() as Cheval);
      });
      return documents;
    },
  });

  lesChevaux = computed(() => {
    console.log('Reloading chevaux from resource');
    return this.chevauxResource.hasValue() ? this.chevauxResource.value() : [];
  });

  async getCheval(id: string): Promise<Cheval> {
    const document = doc(this.chevauxRef, id);
    const docsnap = await getDoc(document);

    return this.DataToCheval(docsnap.data()!);
  }

  async addCheval(newCheval: Partial<Cheval>) {
    const docRef = await addDoc(this.chevauxRef, newCheval);
    await setDoc(docRef, { _id: docRef.id }, { merge: true });
  }

  async updateCheval(_id: string, newCheval: Partial<Cheval>) {
    const docRef = doc(this.chevauxRef, _id);
    await setDoc(docRef, newCheval, { merge: true });
  }

  async deleteCheval(id: string) {
    const docRef = doc(this.firestore, this.colllectionName, id);
    await deleteDoc(docRef);
  }

  chevalExits = computed(async () => {
    const document = doc(this.chevauxRef, this.chevalID()!);
    const docsnap = await getDoc(document);
    return docsnap.exists() ? true : false;
  });

  DataToCheval(data: any): Cheval {
    return {
      _id: data._id,
      nom: data.nom!,
      dateNaissance: data.dateNaissance!,
    };
  }
  refreshChevaux() {
    this.chevauxResource.reload(); // recharge la resource
  }
}
