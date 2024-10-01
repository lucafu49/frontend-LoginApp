import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'register',component:RegisterComponent},
    {path: 'login',component:LoginComponent},
    {path: 'home',component:DashboardComponent, canActivate:[authGuard]}
];
