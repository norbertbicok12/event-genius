import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }

  async login(email: string, password: string) {
    const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    if (user) {
      // Fetch user details from Firestore
      const userDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
      const userData = userDoc?.data(); // Add null check for userDoc
      console.log(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    }
    return null; // Add a return statement for the case when user is null
  }

  async signup(email: string, fullname: string, password: string): Promise<firebase.auth.UserCredential> {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    if (user) {
      // Save additional user details in Firestore
      await this.firestore.collection('users').doc(user.uid).set({
        email,
        fullname,
        password
      });
      return userCredential; // Fix: Return userCredential instead of user
    }
    throw new Error('User not found');
  }

  getUserEmail() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.email;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getCurrentUser() {
    console.log(this.afAuth.user);
    return this.afAuth.user;
      
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
