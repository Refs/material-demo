import { createSelector } from '@ngrx/store';

import * as fromReducers from '../reducers';

export const getRouterModuleLink = createSelector(
  fromReducers.getRouterState,
  (router) => {
    if(router) {
      return router.state.url.split('/')[1];
    }
  }
)


