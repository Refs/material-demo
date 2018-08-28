import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'com-record' },
  {
    path: 'com-record',
    component: fromContainers.ComRecordComponent,
  },
  {
    path: 'spot-manage',
    component: fromContainers.SpotManageComponent,
  },
  {
    path: 'road-manage',
    component: fromContainers.RoadManageComponent,
  },
  {
    path: 'cross-manage',
    component: fromContainers.CrossManageComponent,
  },
  {
    path: 'firm-manage',
    component: fromContainers.FirmManageComponent,
  },
  {
    path: 'control-upload',
    component: fromContainers.ControlUploadComponent,
  },
  {
    path: 'interface-manage',
    component: fromContainers.InterfaceManageComponent,
  },
  {
    path: 'add-bayonet',
    loadChildren: '../ar-add-bayonet/ar-add-bayonet.module#ArAddBayonetModule'
  }
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
