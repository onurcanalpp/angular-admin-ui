import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, catchError, from, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {


    constructor(private auth: AngularFireAuth) {
     }

    signIn(params: SignIn): Observable<any> {
        return from(this.auth.signInWithEmailAndPassword(
            params.email,
            params.password
        )).pipe(
            catchError(error => {
                console.error('Authentication error:', error);
                return throwError(() => error);
            })
        );
    }

    signOut(): Observable<void> {
        return from(this.auth.signOut());
    }
}

type SignIn = {
    email: any,
    password: any
}