import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewContainerRef, TemplateRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-com-record',
  templateUrl: './com-record.component.html',
  styleUrls: ['./com-record.component.scss']
})
export class ComRecordComponent implements OnInit, AfterViewInit, AfterViewChecked {


  mapInited = false;

  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
    if ( (<any>window).minemap && !this.mapInited ) {
      this.initMap();
      this.mapInited = true;
    }
  }

  ngOnInit() {
  }

  initMap() {
    (<any>window).minemap.domainUrl = '//minedata.cn';
    (<any>window).minemap.dataDomainUrl = '//datahive.minedata.cn';
    (<any>window).minemap.spriteUrl = '//minedata.cn/minemapapi/v2.0.0/sprite/sprite';
    (<any>window).minemap.serviceUrl = '//minedata.cn/service';
    (<any>window).minemap.accessToken = 'eb782eb5a51d4217a323e2fd2abe7401';
    (<any>window).minemap.solution = 2365;
    const map = new (<any>window).minemap.Map({
        container: 'map',
        style: '//minedata.cn/service/solu/style/id/2365',
        center: [116.46, 39.92],
        zoom: 16,
        pitch: 60,
        maxZoom: 17,
        minZoom: 9,
    });
  }

}

