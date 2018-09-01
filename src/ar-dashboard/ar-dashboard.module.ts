import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromContainers from './containers';

import { ArDashboardRoutingModule } from './ar-dashboard-routing.module';
import { ArDashboardMaterialModule } from './ar-dashboard-material.module';



@NgModule({
  declarations: [
    ...fromContainers.containers
  ],
  imports: [
    CommonModule,
    ArDashboardRoutingModule,
    ArDashboardMaterialModule
  ],
})
export class ArDashboardModule { }
