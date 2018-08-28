
import * as fromModels from '../../models';

import * as fromActions from '../actions';

export interface LeftMenusState {
  entities: {[id: number]: fromModels.TopNavItem};
  loaded: boolean;
  loading: boolean;
  selectedSideMenu: fromModels.SideNavMenu | null;
}


export const initialState: LeftMenusState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedSideMenu: null
};

export function reducer(
  state: LeftMenusState = initialState,
  action: fromActions.LeftMenusAction
): LeftMenusState {
  switch (action.type) {
    case fromActions.LeftMenusActionType.LOAD_LEFT_MENUS:
      {
        return {
          ...state,
          loading: true
        };
      }

    case fromActions.LeftMenusActionType.LOAD_LEFT_MENUS_SUCCESS:
      {
        const topNavItemArray = action.payload;
        const entities = topNavItemArray.reduceRight(
          // tslint:disable-next-line:no-shadowed-variable
          (entities: {[id: number]: fromModels.TopNavItem}, topNavItem: fromModels.TopNavItem) => {
            return {
              ...entities,
              [topNavItem.id]: topNavItem
            };
          },
          {
            ...state.entities
          }
        );
        return {
          ...state,
          loading: false,
          loaded: true,
          entities
        };
      }
    case fromActions.LeftMenusActionType.LOAD_LEFT_MENUS_FAIL:
      {
        return {
          ...state,
          loading: false,
          loaded: false
        };
      }
  }
  // this is a bug , if we don't return after @ngrx/store/init our states is still empty;
  return state;
}

export const getLeftMenusEntities = (state: LeftMenusState) => state.entities;
export const getLeftMenusLoaded = (state: LeftMenusState) => state.loaded;
export const getLeftMenusLoading = (state: LeftMenusState) => state.loading;





