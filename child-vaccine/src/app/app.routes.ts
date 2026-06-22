import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'children-list',
    loadComponent: () => import('./features/children/children-list/children-list.page').then( m => m.ChildrenListPage)
  },
  {
    path: 'child-detail',
    loadComponent: () => import('./features/children/child-detail/child-detail.page').then( m => m.ChildDetailPage)
  },
  {
    path: 'campaigns-list',
    loadComponent: () => import('./features/campaigns/campaigns-list/campaigns-list.page').then( m => m.CampaignsListPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'child-form',
    loadComponent: () => import('./features/children/child-form/child-form.page').then( m => m.ChildFormPage)
  },
  {
    path: 'add-record',
    loadComponent: () => import('./features/children/add-record/add-record.page').then( m => m.AddRecordPage)
  },
];