import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainer from './containers';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'echarts' },
  { path: 'echarts', component: fromContainer.EchartsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArChartsRoutingModule {}


