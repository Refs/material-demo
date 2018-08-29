import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromContainers from './containers';

import { ArDashboardRoutingModule } from './ar-dashboard-routing.module';


@NgModule({
  declarations: [
    ...fromContainers.containers
  ],
  imports: [
    CommonModule,
    ArDashboardRoutingModule
  ],
})
export class ArDashboardModule { }
