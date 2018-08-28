import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromContainers from './containers';

import { ArDevmanageRoutingModule } from './arr-add-bayonet-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ArDevmanageRoutingModule
  ],
  declarations: [
    ...fromContainers.containers
  ]
})
export class ArAddBayonetModule { }
