import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import * as fromContainers from './containers';

import { ArPermonitorRoutingModule } from './ar-permonitor-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ArPermonitorRoutingModule
  ],
  declarations: [
    ...fromContainers.containers
  ]
})
export class ArPermonitorModule { }
