import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { User } from '../model/User'
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  getCurrentUserData(): Observable<User | null> {
    const currentUser = this.auth.currentUser;

    if (!currentUser) {
      return from(Promise.resolve(null));
    }

    const userDocRef = doc(this.firestore, 'Users', currentUser.uid);
    return from(getDoc(userDocRef).then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.data() as User;
      } else {
        return null;
      }
    }));
  }
}