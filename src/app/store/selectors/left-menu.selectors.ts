import { createSelector } from '@ngrx/store';

import * as fromReducers from '../reducers';

import * as fromLeftMenus from '../reducers/leftMenus.reducer';

export const getLeftMenus = createSelector(
  fromReducers.getLeftMenusState,
  fromLeftMenus.getLeftMenusEntities,
);


// get top nav items
export const getTopMenuItems = createSelector(
  getLeftMenus,
  (entities) => {
     if (entities) {
      const itemArray: any = [];
      // tslint:disable-next-line:forin
      for (const key in entities) {
        itemArray.push(entities[key]);
      }
       return itemArray;
     }
  }
);


// get side nav items
export const getSelectedLeftMenusEntities = createSelector(
  fromReducers.getRouterState,
  getLeftMenus,
  (router, entities) => {
    if (router && entities) {
      // performance-monitor fault-warning device-maintenance statistical-analysis
      const map = {
        'device-manage': 395,
        'performance-monitor': 396,
        'fault-warning': 477,
        'statistical-analysis': 512,
        'device-maintenance': 529
      };
      // tslint:disable-next-line:prefer-const
      let a = router.state.url.split('/')[1];
      return entities[map[a]].childs ;
    }
  }
);




