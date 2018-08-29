import { Component , OnInit, ViewChild, ComponentRef, AfterViewInit, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { Store, select } from '@ngrx/store';

import * as fromStore from '../../store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('sideNav') sideNav: MatSidenav;

  @HostListener('window:resize', ['$event'])
  onresize(event) {
    this.configureSideNav();
  }
  // tslint:disable-next-line:member-ordering
  smallScreen: boolean;
  // tslint:disable-next-line:member-ordering
  currentModuleRouter: string;
  // tslint:disable-next-line:member-ordering
  sideNavData = [
    {
      routerFlag: 'dashboard',
      header : {
        icon: 'dashboard',
        description: 'dashboard',
      },
      lists: [
        {link: '/dashboard/dashboard', linkTitle: 'dashboard' },
        {link: '/dashboard/analysis', linkTitle: 'analysis' },
        {link: '/dashboard/monitor', linkTitle: 'monitor' },
        {link: '/dashboard/workplace', linkTitle: 'workplace' }
      ]
    },
    {
      routerFlag: 'maps',
      header : {
        icon: 'map',
        description: 'maps',
      },
      lists: [
        {link: '/maps/baidu', linkTitle: 'baidu' },
        {link: '/maps/minemap', linkTitle: 'minemap' },
      ]
    },
    {
      routerFlag: 'charts',
      header : {
        icon: 'pie_chart',
        description: 'charts',
      },
      lists: [
        {link: '/charts/echarts', linkTitle: 'echarts' },
      ]
    }
  ];

  constructor(
    private store: Store<fromStore.RootState>
  ) {}

  ngOnInit () {
    this.store.pipe(
      select(fromStore.getRouterModuleLink),
    ).subscribe((data) => {
      this.currentModuleRouter = data;
    });
  }

  configureSideNav() {
    this.smallScreen = window.innerWidth < 700 ? true : false;
    if (!this.smallScreen) {
      this.sideNav.mode = 'side';
      this.sideNav.opened = true;
    } else {
      this.sideNav.mode = 'over';
      this.sideNav.opened = false;
    }
  }

}
