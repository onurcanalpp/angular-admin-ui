import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, catchError, from, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private readonly AUTH_TOKEN_KEY = 'authToken';

    public isLoggedIn$ = new BehaviorSubject<boolean>(false);    

    constructor(
        private auth: AngularFireAuth,
        private router: Router) {
        this.checkStoredToken();
        
        console.log(this.isLoggedIn$.getValue())
    }


    checkUserAuthenticate() {
        this.auth.authState.pipe(
            tap(user => {
                if (user) {
                    console.log("turn true");
                    this.isLoggedIn$.next(true);
                    console.log(this.isLoggedIn$.value);
                    this.router.navigate(['/home']);  
                } else {
                    this.isLoggedIn$.next(false);
                }
            })
        ).subscribe();
    }

    private checkStoredToken() {
        const storedToken = localStorage.getItem(this.AUTH_TOKEN_KEY);
    
        if (storedToken) {
            this.isLoggedIn$.next(true);
        }
      }
    

   

    signIn(params: SignIn) {
        return new Promise((resolve, reject)=> {
            this.auth.signInWithEmailAndPassword(
                params.email,
                params.password
              ).then((res: any) => {
                  console.log(res);
                  localStorage.setItem(this.AUTH_TOKEN_KEY, res?.uid)
                  resolve(true)
              }).catch(err => reject(err));
        })
        
      }

    signOut() {
        localStorage.removeItem(this.AUTH_TOKEN_KEY);
        this.auth.signOut().then(() => {
            this.isLoggedIn$.next(false);
            this.router.navigate(['login']);

        }).catch(err=> {
            console.log(err);
        });
    }
}

type SignIn = {
    email: any,
    password: any
}