// app.routes.ts
import { Routes } from '@angular/router';
import { MainContentComponent } from './core/components/main-content/main-content.component';
import { LoginComponent } from './core/components/login/login.component';
import { MainComponent } from './core/components/main/main.component';
import { UsersComponent } from './core/components/users/users.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: "/home", pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: MainComponent, canActivate: [AuthGuard], children: [
        { path: '', component: MainContentComponent },
        { path: 'users', component: UsersComponent }
    ]}
];