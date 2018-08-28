
export interface SideNavItem {
  id?: number;
  menuLink?: string;
  menuName: string;
  orderValue?: number;
  selected?: boolean;
  [key: string]: any;
}
