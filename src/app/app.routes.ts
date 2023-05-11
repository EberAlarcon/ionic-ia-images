import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'create-images',
    loadChildren: () => import('./pages/create-images/create-images.module').then( m => m.CreateImagesPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },

];

