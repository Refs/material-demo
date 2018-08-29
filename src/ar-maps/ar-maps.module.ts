import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArMapsRoutingModule } from './ar-maps-routing.module';

import * as fromContainer from './containers';


@NgModule({
  imports: [
    CommonModule,
    ArMapsRoutingModule
  ],
  declarations: [
    ...fromContainer.containers
  ]
})
export class ArMapsModule { }
