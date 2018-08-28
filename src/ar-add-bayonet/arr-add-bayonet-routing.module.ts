import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'device-information' },
  {
    path: 'device-information',
    component: fromContainers.DeviceInformationComponent,

  },
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
export class ArDevmanageRoutingModule {}
