import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule
  ],
  exports: [
    MatGridListModule,
    MatCardModule
  ]
})
export class ArChartsMaterialModule {}


