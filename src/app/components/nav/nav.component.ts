import { Component, OnInit } from '@angular/core';

import * as fromServices from '../../services';

import { Store, select } from '@ngrx/store';

import * as fromStore from '../../store';

import { Observable } from 'rxjs/Observable';
import { tap } from '../../../../node_modules/rxjs/operators';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  classMap = {
    '#/' : 'nth-nav1',
    '#2' : 'nth-nav2',
    '#3' : 'nth-nav3',
    '#6' : 'nth-nav4',
    '#62' : 'nth-nav5',
  };
  linkMap = {
    '#/' : '/device-manage',
    '#2' : '/performance-monitor',
    '#3' : '/fault-warning',
    '#6' : '/statistical-analysis',
    '#62' : '/device-maintenance',
  };

  topMenus$: Observable<any>;
  constructor(
    private topServices: fromServices.TopNavItemsService,
    private store: Store<fromStore.RootState>
  ) { }

  ngOnInit() {
    this.topMenus$ = this.store.pipe(
      select(fromStore.getTopMenuItems),
      tap((data) => {
        // console.log(data);
      })
    );
    // this.topMenus$.subscribe();
  }
  determineLink (menulink) {
      return this.linkMap[menulink];
  }

  determineClass (menulink) {
    return this.classMap[menulink];
  }


}
