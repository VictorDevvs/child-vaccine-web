import {Injectable, inject} from '@angular/core';
import {
    Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User
} from '@angular/fire/auth';
import {Observable, from} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private auth = inject(Auth);

    get currentUser(): User | null {
        return this.auth.currentUser;
    }

    register(email: string, password: string): Observable<any> {
        return from(createUserWithEmailAndPassword(this.auth, email, password));
    }

    login(email: string, password: string): Observable<any> {
        return from(signInWithEmailAndPassword(this.auth, email, password));
    }

    logout(): Observable<void> {
        return from(signOut(this.auth));
    }
}