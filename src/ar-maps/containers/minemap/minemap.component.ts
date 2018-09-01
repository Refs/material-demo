import { Component, OnInit, AfterViewChecked, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


import * as fromShareServices from '../../../ar-shared/services';


@Component({
  selector: 'app-minemap',
  templateUrl: './minemap.component.html',
  styleUrls: ['./minemap.component.scss']
})
export class MinemapComponent implements OnInit, AfterViewChecked, AfterViewInit , OnDestroy{

  public minemapInited = false;
  private _sideNavWatcher: Subscription;
  public minemap: any;

  constructor(
    private progressBarService: fromShareServices.ProcessBarService,
    private sidenavCloseService: fromShareServices.SidenavCloseService,
  ) { }

  ngOnInit() {
    // fix the bug angular second detect in develop mode;
    setTimeout(() => {
      this.progressBarService.processShow = true;
    });
    // fix the map won't resize when the side nav toggle
    this._sideNavWatcher = this.sidenavCloseService.sidenavActionCast$
      .subscribe((data) => {
        this.resizeMap();
      });
    // fix the map Load sometime won't load , because the async resource hasn't been loaded
    if (( (<any>window).minemap ) && !this.minemapInited) {
      this.initMap();
      this.minemapInited = true;
    } else {
      setTimeout(() => {
    // fix the map won't load , when we refresh the browser
        if ( ( (<any>window).minemap ) && !this.minemap ) {
          this.initMap();
          this.minemapInited = true;
        }
      }, 20);
    }
  }

  ngAfterViewInit() {
    if (( (<any>window).minemap ) && !this.minemapInited) {
      this.initMap();
      this.minemapInited = true;
    }
    if ( this.minemap ) {
      const _this = this;
    // fix the map bug , when the map init, it won't size 100%;
      _this.minemap.on('load', function() {
        _this.resizeMap();
        setTimeout(() => {
          _this.progressBarService.processShow = false;
        }, 2000);
      });
    // debug the map event listener;
      _this.minemap.on('touchstart', function() {
        console.log('touchstart');
      });
      _this.minemap.on('click', function() {
        console.log('click');
      });
      _this.minemap.on('touchmove', function() {
        console.log('touchmove');
      });
    }
  }

  ngOnDestroy() {
    this._sideNavWatcher.unsubscribe();
  }

  ngAfterViewChecked() {

  }

  initMap() {
    (<any>window).minemap.domainUrl = '//minedata.cn';
    (<any>window).minemap.dataDomainUrl = '//datahive.minedata.cn';
    (<any>window).minemap.spriteUrl = '//minedata.cn/minemapapi/v2.0.0/sprite/sprite';
    (<any>window).minemap.serviceUrl = '//minedata.cn/service';
    (<any>window).minemap.accessToken = 'eb782eb5a51d4217a323e2fd2abe7401';
    (<any>window).minemap.solution = 2365;
    this.minemap = new (<any>window).minemap.Map({
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
    if (this.minemap) {
      this.minemap.resize();
    }
  }
}
