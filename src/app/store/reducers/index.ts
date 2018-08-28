import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';
import * as fromLeftMenus from './leftMenus.reducer';

// import { RouterStateUrl } from '../../models/router/router.model';
import * as fromModels from '../../models';


export interface RootState {
  leftMenus: fromLeftMenus.LeftMenusState;
  routerReducer: fromRouter.RouterReducerState<fromModels.RouterStateUrl>;
}

export const reducers: ActionReducerMap<RootState> = {
  routerReducer: fromRouter.routerReducer,
  leftMenus: fromLeftMenus.reducer
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<fromModels.RouterStateUrl>>('routerReducer');

export const getLeftMenusState = createFeatureSelector< fromLeftMenus.LeftMenusState>('leftMenus');


export class CustomSerializer implements fromRouter.RouterStateSerializer<fromModels.RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): fromModels.RouterStateUrl {
    const { url } = routerState;

    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;

    while ( state.firstChild ) {
      state = state.firstChild;
    }

    const { params } = state;

    return { url, queryParams, params };
  }
}

