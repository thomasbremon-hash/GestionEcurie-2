import { computed, effect, inject, Injectable, resource, signal } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
  Unsubscribe,
} from '@angular/fire/firestore';
import { Utilisateur } from './user';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  firestore = inject(Firestore);
  colllectionName = 'utilisateur';
  utilisateursRef = collection(this.firestore, this.colllectionName);

  utilisateurs = signal<Utilisateur[]>([]);
  utilisateurID = signal<string | null>(null);

  // 🔥 Signal qui contient l'utilisateur actuel
  utilisateur = signal<Utilisateur | null>(null);

  private unsubscribe: Unsubscribe | null = null;

  constructor() {
    // 🔥 Effect qui écoute les changements de utilisateurID
    effect(() => {
      const uid = this.utilisateurID();

      // Nettoie l'ancienne souscription
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
      }

      if (!uid) {
        this.utilisateur.set(null);
        return;
      }

      // 🔥 Écoute les changements en temps réel du document Firestore
      const docRef = doc(this.utilisateursRef, uid);
      this.unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            this.utilisateur.set(this.DataToUser(snapshot.data()));
          } else {
            this.utilisateur.set(null);
          }
        },
        (error) => {
          console.error('❌ Erreur écoute utilisateur:', error);
          this.utilisateur.set(null);
        }
      );
    });
  }

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

  async getUser(id: string): Promise<Utilisateur> {
    const document = doc(this.utilisateursRef, id);
    const docsnap = await getDoc(document);

    if (!docsnap.exists()) {
      throw new Error(`Utilisateur ${id} non trouvé`);
    }

    return this.DataToUser(docsnap.data()!);
  }

  async addUser(newUser: Partial<Utilisateur>) {
    const docRef = await addDoc(this.utilisateursRef, newUser);
    await setDoc(docRef, { _id: docRef.id }, { merge: true });
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
    const uid = this.utilisateurID();
    if (!uid) return false;

    const document = doc(this.utilisateursRef, uid);
    const docsnap = await getDoc(document);
    return docsnap.exists();
  });

  DataToUser(data: any): Utilisateur {
    return {
      _id: data._id,
      prenom: data.prenom ?? '',
      nom: data.nom ?? '',
      displayName: data.displayName,
      email: data.email ?? '',
      emailVerified: data.emailVerified,
      adresse: data.adresse ?? {
        rue: '',
        cp: '',
        ville: '',
        pays: '',
      },
      dateNaissance: data.dateNaissance ?? '',
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
    this.usersResource.reload();
  }

  async getUserByUidOrEmail(uid: string) {
  
    console.log('email', uid);
    const q = query(this.utilisateursRef, where('uid', '==', uid));
    console.log("q: ",  q);
    const docsnap = (await getDocs(q)).forEach((doc)=> {
      console.log("doc", doc.data())
      this.utilisateur.set(this.DataToUser(doc.data())); 
    })
    
   
    
   
  }
}
