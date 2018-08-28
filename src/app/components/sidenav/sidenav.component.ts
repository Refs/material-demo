import { Component, OnInit, ViewChild } from '@angular/core';

import { Store, select } from '@ngrx/store';

import * as fromStore from '../../store';
// import * as fromModels from '../../models';

import { Observable } from 'rxjs/Observable';
import { tap } from '../../../../node_modules/rxjs/operators';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {

  // @ViewChild('a.active') aActive;

  leftMenus$: Observable<any>;


  constructor(
    private store: Store<fromStore.RootState>
  ) { }

  ngOnInit() {
    this.leftMenus$ = this.store.pipe(
      select(fromStore.getSelectedLeftMenusEntities),
      tap((data) => {
        console.log(data);
      })
    );
    this.leftMenus$.subscribe();
  }

}
