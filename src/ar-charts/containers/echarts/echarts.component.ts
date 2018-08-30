import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

import { MatGridList } from '@angular/material';


import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.scss']
})
export class EchartsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('grid') public grid: MatGridList;

  public watcher: Subscription;

  public chartOption1 = {
    title: {
      text: '堆叠区域图'
    },
    tooltip : {
      trigger: 'axis'
    },
    legend: {
      data:['视频广告','邮件营销']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        boundaryGap : false,
        data : ['周一','周二','周三','周四','周五','周六','周日']
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'邮件营销',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[120, 132, 101, 134, 90, 230, 210]
      },
      {
        name:'视频广告',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[150, 232, 201, 154, 190, 330, 410]
      }
    ]
  };
  public dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
  public data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
  public yMax = 500;
  public dataShadow = [];
  public chartOption2 = {
    title: {
      text: '特性示例：渐变色 阴影 点击缩放',
      subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
  },
  xAxis: {
      data: this.dataAxis,
      axisLabel: {
          inside: true,
          textStyle: {
              color: '#fff'
          }
      },
      axisTick: {
          show: false
      },
      axisLine: {
          show: false
      },
      z: 10
  },
  yAxis: {
      axisLine: {
          show: false
      },
      axisTick: {
          show: false
      },
      axisLabel: {
          textStyle: {
              color: '#999'
          }
      }
  },
  dataZoom: [
      {
          type: 'inside'
      }
  ],
  series: [
      { // For shadow
          type: 'bar',
          itemStyle: {
              normal: {color: 'rgba(0,0,0,0.05)'}
          },
          barGap:'-100%',
          barCategoryGap:'40%',
          data: this.dataShadow,
          animation: false
      },
      {
          type: 'bar',
          itemStyle: {
              normal: {
                  color: new (window as any).echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                          {offset: 0, color: '#83bff6'},
                          {offset: 0.5, color: '#188df0'},
                          {offset: 1, color: '#188df0'}
                      ]
                  )
              },
              emphasis: {
                  color: new (window as any).echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                          {offset: 0, color: '#2378f7'},
                          {offset: 0.7, color: '#2378f7'},
                          {offset: 1, color: '#83bff6'}
                      ]
                  )
              }
          },
          data: this.data
      }
  ]
  };

  constructor(
    public media: ObservableMedia
  ) {
  }

  ngAfterViewInit() {
    this.updateContent();
    this.watcher = this.media
      .subscribe((change: MediaChange) => {
        console.log(change.mqAlias);
        this.updateContent();
      });
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  updateContent(): void {
    if (this.media.isActive('xs')) {
      this.loadXsContent();
    } else if ( this.media.isActive('sm') ) {
      this.loadSmContent();
    } else if ( this.media.isActive('md') ) {
      this.loadMdContent();
    } else if ( this.media.isActive('lg') ) {
      this.loadLgContent();
    } else if ( this.media.isActive('xl') ) {
      this.loadXlContent();
    }
  }
  loadLgContent() {
    this.grid.cols = 3;
  }
  loadXlContent() {
    this.grid.cols = 3;
  }
  loadMdContent() {
    this.grid.cols = 2;
  }
  loadSmContent() {
    this.grid.cols = 1;
  }
  loadXsContent() {
    this.grid.cols = 1;
  }

}
