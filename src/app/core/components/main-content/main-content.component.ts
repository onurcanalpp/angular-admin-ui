import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from '../../services/auth/authentication.service';


@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule],
  providers: [AngularFirestore],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
    isLoggedIn = false;
    constructor(
        private angularFirestore: AngularFirestore,
        private authService: AuthenticationService) {
    }
    ngOnInit() {
    }

     signOut(){
        this.authService.signOut();
    }
    
    getProduct(id: any) {
        this.angularFirestore.collection('products').doc(id).valueChanges().subscribe(product => {
            console.log(product);
        });
    }
    
    getAllProducts(){
        this.angularFirestore.collection('products').valueChanges().subscribe(res =>{
            console.log(res);
        })
    }
    

}
