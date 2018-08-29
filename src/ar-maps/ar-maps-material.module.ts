import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule , MatCardModule, MatDividerModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule
  ],
  exports: [
    MatGridListModule,
    MatCardModule,
    MatDividerModule
  ]
})
export class ArMapsMaterialModule {}



