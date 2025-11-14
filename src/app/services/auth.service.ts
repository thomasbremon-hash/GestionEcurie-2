import { Injectable, inject, NgZone, computed } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  ActionCodeSettings,
  onAuthStateChanged,
  User,
  user,
  browserSessionPersistence,
  sendSignInLinkToEmail,
  sendEmailVerification,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  private zone = inject(NgZone);

  /** 🔹 Signal Firebase */
  utilisateur = toSignal(user(this.auth), { initialValue: null });

  /** 🔹 Signal dérivé : connecté ou non */
  isLoggedIn = computed(() => this.utilisateur() !== null);

  constructor() {
    this.setSessionStoragePersistence();
    // Synchronisation manuelle du currentUser (utile si besoin ailleurs)
  }

  private setSessionStoragePersistence(): void {
    this.auth.setPersistence(browserSessionPersistence);
  }

  /** 🔹 Inscription avec email + mot de passe */
  async register(email: string, password: string) {
    try {
      const cred = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('✅ Utilisateur inscrit :', cred.user.email);

      // 🔸 Envoi de l'email de vérification
      await sendEmailVerification(cred.user);
      console.log('📧 Email de vérification envoyé à :', cred.user.email);

      return cred;
    } catch (err: any) {
      console.error('❌ Erreur inscription :', err.message);
      throw err;
    }
  }

  /** 🔹 Connexion email / mot de passe */
  async login(email: string, password: string) {
    try {
      const cred = await signInWithEmailAndPassword(this.auth, email, password);
      await cred.user.reload(); // 🔄 rafraîchit le statut

      if (!cred.user.emailVerified) {
        await sendEmailVerification(cred.user);
        throw new Error('Veuillez vérifier votre adresse e-mail avant de vous connecter.');
      }

      this.zone.run(() => this.router.navigate(['/']));
      console.log('✅ Connecté :', cred.user.email);
    } catch (err: any) {
      console.error('❌ Erreur connexion :', err.message);
      throw err;
    }
  }

  /** 🔹 Connexion Google */
  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(this.auth, provider);
      this.zone.run(() => this.router.navigate(['/']));
      console.log('✅ Connexion Google :', cred.user.email);
    } catch (err: any) {
      console.error('❌ Erreur Google :', err.message);
      throw err;
    }
  }

  /** 🔹 Déconnexion */
  async logout() {
    try {
      await signOut(this.auth);
      this.zone.run(() => this.router.navigate(['/login']));
      console.log('✅ Déconnexion réussie');
    } catch (err: any) {
      console.error('❌ Erreur déconnexion :', err.message);
      throw err;
    }
  }

  async invitation(email: string) {
    console.log('Enregistrement');
    try {
      await sendSignInLinkToEmail(this.auth, email, this.acs);
      window.localStorage.setItem('emailForSignIn', email);
      console.log('✅ Email envoyé à', email);
    } catch (err) {
      console.error('❌ Erreur envoi email:', err);
    }
  }
  acs: ActionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: 'https://gestion-ecurie--gestion-ecurie-1.europe-west4.hosted.app/',
    // This must be true
    handleCodeInApp: true,
    // installIfNotAvailable
    // minimumVersion
  };

  /** 🔹 Inscription */
  async newUser(
    prenom: string,
    nom: string,
    email: string,
    password: string,
    rue: string,
    ville: string,
    cp: string,
    dateNaissance: string
  ) {
    try {
      const cred = await createUserWithEmailAndPassword(this.auth, email, password);

      console.log('✅ Utilisateur inscrit :', cred.user.uid);
      /*  this.router.navigate(['/']); */
    } catch (err: any) {
      console.error('❌ Erreur inscription :', err.message);
      throw err;
    }
  }

  /** 🔹 Envoi d’un email de réinitialisation de mot de passe */
  async sendPasswordReset(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('📧 Email de réinitialisation envoyé à :', email);
    } catch (err: any) {
      console.error('❌ Erreur envoi email de réinitialisation :', err.message);
      throw err;
    }
  }
}
