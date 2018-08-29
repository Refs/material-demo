import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromComponents from './components';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...fromComponents.components
  ],
  exports: [
    ...fromComponents.components
  ]
})
export class ArSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ArSharedModule,
      providers: []
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: ArSharedModule,
      providers: []
    };
  }

}

