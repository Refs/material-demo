import { Component , OnInit, ViewChild, HostListener, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { ObservableMedia, MediaChange } from '@angular/flex-layout';


import { Store, select } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromShareServices from '../../../ar-shared/services';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('sideNav') sideNav: MatSidenav;

  public watcher: Subscription;

  public progressBarShow$: Observable<boolean>;

  public currentModuleRouter: string;

  public sideNavData = [
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
    private store: Store<fromStore.RootState>,
    private media: ObservableMedia,
    private progressBarService: fromShareServices.ProcessBarService,
    private sidenavCloseService: fromShareServices.SidenavCloseService,
  ) {}

  ngOnInit () {
    this.progressBarShow$ = this.progressBarService.processShowCast$;
    // open the process bar
    this.progressBarService.processShow = true;
    this.store.pipe(
      select(fromStore.getRouterModuleLink),
    ).subscribe((data) => {
      this.currentModuleRouter = data;
    });
  }
  ngAfterViewInit() {
    this.sideNav.onClose.subscribe(() => {
      this.sidenavCloseService.sidenavAction = 1;
    });
    this.sideNav.onOpen.subscribe(() => {
      this.sidenavCloseService.sidenavAction = 1;
    });
    setTimeout(() => {
      this.progressBarService.processShow = false;
    }, 2000);
    setTimeout(() => {
      this.updateContent();
    });
    this.watcher = this.media
      .subscribe((change: MediaChange) => {
        console.log(change.mqAlias);
        setTimeout(() => {
          this.updateContent();
        }) ;
      });
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
    this.sideNav.mode = 'side';
    this.sideNav.opened = true;
  }
  loadXlContent() {
    this.sideNav.mode = 'side';
    this.sideNav.opened = true;
  }
  loadMdContent() {
    this.sideNav.mode = 'side';
    this.sideNav.opened = true;
  }
  loadSmContent() {
    this.sideNav.mode = 'over';
    this.sideNav.opened = false;
  }
  loadXsContent() {
    this.sideNav.mode = 'over';
    this.sideNav.opened = false;
  }

}
