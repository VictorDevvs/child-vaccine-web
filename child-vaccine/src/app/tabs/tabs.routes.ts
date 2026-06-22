import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'children',
        loadComponent: () =>
          import('../features/children/children-list/children-list.page').then(m => m.ChildrenListPage),
      },
      {
        path: 'children/new',
        loadComponent: () =>
          import('../features/children/child-form/child-form.page').then(m => m.ChildFormPage),
      },
      {
        path: 'children/:id',
        loadComponent: () =>
          import('../features/children/child-detail/child-detail.page').then(m => m.ChildDetailPage),
      },
      {
        path: 'children/:id/add-record',
        loadComponent: () =>
          import('../features/children/add-record/add-record.page').then(m => m.AddRecordPage),
      },
      {
        path: 'campaigns',
        loadComponent: () =>
          import('../features/campaigns/campaigns-list/campaigns-list.page').then(m => m.CampaignsListPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../features/profile/profile/profile.page').then(m => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/tabs/children',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/children',
    pathMatch: 'full',
  },
];