import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatGridListModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatGridListModule,
    MatCardModule
  ],
  exports: [
    MatCardModule,
    MatGridListModule
  ]
})
export class ArDashboardMaterialModule {
}


