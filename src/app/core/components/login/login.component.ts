import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatProgressSpinnerModule],
  providers: [
    AuthenticationService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {

    isLoggingIn: boolean = false;

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private snackBar: MatSnackBar) {
            if(this.authService.isLoggedIn){
                this.router.navigate(['home']);
                window.alert("u already logged in");
                console.log(this.authService.userInformation);
            }
    }


    loginForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });
    ngOnInit(){
    }

    login() {
        this.isLoggingIn = true;
        this.authService.signIn({
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        }).then((res: any) => {
        }).catch(()=> this.isLoggingIn = false);
    }

}
