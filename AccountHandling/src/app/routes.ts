import { Routes } from '@angular/router';
import {authorizationGuard} from './core/guard/authorization.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing-page/page/landing-page.component')
      .then(m => m.LandingPageComponent),
    canActivate: [authorizationGuard]
  },
  {
    path: 'account-overview/:id',
    loadComponent: () => import('./account-overview/page/account-overview-page.component')
      .then(m => m.AccountOverviewPageComponent),
    canActivate: [authorizationGuard]
  },
  {
    path: 'account/:accountId/transaction-overview/:id',
    loadComponent: () => import('./transaction-overview/page/transaction-overview-page.component')
      .then(m => m.TransactionOverviewPageComponent),
    canActivate: [authorizationGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./core/login/page/login-page.component')
      .then(m => m.LoginPageComponent)
  }
];
