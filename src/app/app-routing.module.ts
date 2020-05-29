import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'offer-list',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'offer-details',
    loadChildren: () => import('./offer-details/offer-details.module').then( m => m.OfferDetailsPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'add-course',
    loadChildren: () => import('./add-course/add-course.module').then( m => m.AddCoursePageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'offer-list',
    loadChildren: () => import('./offer-list/offer-list.module').then( m => m.OfferListPageModule)
  },
  {
    path: 'signIn',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate:[AuthGuardService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
