import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { moduleOrComponent } from '@angular/flex';


import { ArChartsRoutingModule } from './ar-charts-routing.module';
import { ArChartsMaterialModule } from './ar-charts-material.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


import * as fromContainer from './containers';



@NgModule({
  imports: [
    CommonModule,
    ArChartsRoutingModule,
    ArChartsMaterialModule,
    NgxEchartsModule,
    PerfectScrollbarModule
  ],
  declarations: [
    ...fromContainer.containers
  ]
})
export class ArChartsModule { }
