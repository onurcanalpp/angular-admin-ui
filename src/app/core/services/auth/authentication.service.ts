import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, catchError, from, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private userData: any;


    constructor(
        private auth: AngularFireAuth,
        private router: Router,
        private ngZone: NgZone)
         {
            this.auth.authState.subscribe((user) => {
                if (user) {
                  this.userData = user;
                  localStorage.setItem('user', JSON.stringify(this.userData));
                  JSON.parse(localStorage.getItem('user')!);
                  this.router.navigate(['home']);
                } else {
                  localStorage.setItem('user', 'null');
                  JSON.parse(localStorage.getItem('user')!);
                  this.router.navigate(['login']);
                }
            });
              
    }


    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!);
        if (user == null) {
            return false;
        } else {
            return true;
        }
    }

    get userInformation() {
        return JSON.parse(localStorage.getItem('user')!);
    }

    signIn(params: SignIn) {
        return new Promise((resolve, reject)=> {
            this.auth.signInWithEmailAndPassword(
                params.email,
                params.password
              ).then((res: any) => {
                   this.ngZone.run(()=> {
                    localStorage.setItem('user', JSON.stringify(res));
                    this.router.navigate(['home']);
                   }) 
              }).catch(err => reject(err));
        })
        
      }

    signOut() {
        return this.auth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        });
    }
}

type SignIn = {
    email: any,
    password: any
}