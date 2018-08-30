import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


import * as fromSharedService from '../../../ar-shared/services';


@Component({
  selector: 'app-minemap',
  templateUrl: './minemap.component.html',
  styleUrls: ['./minemap.component.scss']
})
export class MinemapComponent implements OnInit, AfterViewChecked {

  // private _mapInited = false;
  private _watcher: Subscription;
  private _map: any;


  constructor(
    public sidenavClose: fromSharedService.SidenavCloseService
  ) { }

  ngOnInit() {
    if (( (<any>window).minemap )) {
      this.initMap();
    }
    this._watcher = this.sidenavClose.cast.subscribe((data) => {
      this.resizeMap();
    });
  }

  ngAfterViewChecked() {
    if (this._map) {
      this._map.resize();
    }
  }

  initMap() {
    (<any>window).minemap.domainUrl = '//minedata.cn';
    (<any>window).minemap.dataDomainUrl = '//datahive.minedata.cn';
    (<any>window).minemap.spriteUrl = '//minedata.cn/minemapapi/v2.0.0/sprite/sprite';
    (<any>window).minemap.serviceUrl = '//minedata.cn/service';
    (<any>window).minemap.accessToken = 'eb782eb5a51d4217a323e2fd2abe7401';
    (<any>window).minemap.solution = 2365;
    this._map = new (<any>window).minemap.Map({
        container: 'map',
        style: '//minedata.cn/service/solu/style/id/2365',
        center: [116.46, 39.92],
        zoom: 16,
        pitch: 60,
        maxZoom: 17,
        minZoom: 9,
    });
  }

  resizeMap() {
    if (this._map) {
      this._map.resize();
    }
  }
}
