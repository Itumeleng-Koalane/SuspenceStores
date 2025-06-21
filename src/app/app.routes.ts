import { Routes } from '@angular/router';
import { LoginScreenComponent } from './user/login-screen/login-screen.component';
import { RegisterScreenComponent } from './user/register-screen/register-screen.component';
import { UserComponent } from './user/user.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
{ path: '', redirectTo: '/user/login-screen', pathMatch: 'full' },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'register-screen', component: RegisterScreenComponent },
      { path: 'login-screen', component: LoginScreenComponent },
    ],
  },
  {
      path: 'landing-screen',
      component: LandingPageComponent,
      canActivate: [authGuard],
  },
];
