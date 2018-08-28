import { Component , OnInit } from '@angular/core';


import { Store, select } from '@ngrx/store';

import * as fromStore from '../../store';

import { Observable } from 'rxjs/Observable';
import { tap } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {



  constructor(
    private store: Store<fromStore.RootState>
  ) {
    this.store.dispatch(new fromStore.LoadLeftMenus() );
  }

  ngOnInit () {
  }


}
