import { Injectable } from '@angular/core';
import { Actions , Effect } from '@ngrx/effects';

import * as fromActions from '../actions';
import * as fromServices from '../../services';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LeftMenusEffects {
  constructor(
    private action$: Actions,
    private topServices: fromServices.TopNavItemsService
  ) {}

  @Effect()
  loadLeftMenus$ = this.action$.ofType(fromActions.LeftMenusActionType.LOAD_LEFT_MENUS).pipe(
    switchMap(() => {
      return this.topServices
        .getTopNavItems()
        .pipe(
          map((leftMenus) => {
            return new fromActions.LoadLeftMenusSuccess(leftMenus);
          }),
          catchError(error => of(new fromActions.LoadLeftMenusFail(error)))
        );
    })
  );
}
