import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-baidu',
  templateUrl: './baidu.component.html',
  styleUrls: ['./baidu.component.scss']
})
export class BaiduComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    if ( (<any>window).BMap) {
      this.initMap();
    }
  }


  initMap() {
    const map = new (<any>window).BMap.Map('map');
    map.centerAndZoom(new (<any>window).BMap.Point(116.404, 39.915), 11);
    map.addControl(new (<any>window).BMap.MapTypeControl({
      mapTypes: [
            (<any>window).BMAP_NORMAL_MAP,
            (<any>window).BMAP_HYBRID_MAP
          ]}));
    map.setCurrentCity('北京');
    map.enableScrollWheelZoom(true);
  }

}
