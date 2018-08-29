import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import * as formContainers from './containers';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'baidu' },
  { path: 'baidu', component: formContainers.BaiduComponent },
  { path: 'minemap', component: formContainers.MinemapComponent },

];


@NgModule({
  imports:[
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArMapsRoutingModule {}




