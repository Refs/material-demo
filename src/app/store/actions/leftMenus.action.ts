import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

export enum LeftMenusActionType {
  LOAD_LEFT_MENUS = '[App] Load LeftMenus',
  LOAD_LEFT_MENUS_FAIL = '[App] Load LeftMenus Fail',
  LOAD_LEFT_MENUS_SUCCESS = '[App] Load LeftMenus success',
}

export class LoadLeftMenus implements Action {
  readonly type = LeftMenusActionType.LOAD_LEFT_MENUS;
}
export class LoadLeftMenusFail implements Action {
  readonly type = LeftMenusActionType.LOAD_LEFT_MENUS_FAIL;
  constructor( public payload: any ) {
  }
}
export class LoadLeftMenusSuccess implements Action {
  readonly type = LeftMenusActionType.LOAD_LEFT_MENUS_SUCCESS;
  constructor( public payload: fromModels.TopNavItem[] ) {
  }
}

export type LeftMenusAction =
  | LoadLeftMenus
  | LoadLeftMenusFail
  | LoadLeftMenusSuccess;

