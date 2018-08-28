
import { SideNavItem } from './side-nav-item.model';

export interface SideNavMenu {
  id?: number;
  menuLink?: string;
  menuName: string;
  orderValue?: number;
  selected?: boolean;
  childs?: SideNavItem[];
  [key: string]: any;

}
