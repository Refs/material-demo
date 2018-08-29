import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArMapsRoutingModule } from './ar-maps-routing.module';
import { ArMapsMaterialModule } from './ar-maps-material.module';


import * as fromContainer from './containers';

import { ArSharedModule } from '../ar-shared/ar-shared.module';




@NgModule({
  imports: [
    CommonModule,
    ArMapsRoutingModule,
    ArSharedModule.forChild(),
    ArMapsMaterialModule
  ],
  declarations: [
    ...fromContainer.containers
  ]
})
export class ArMapsModule { }
