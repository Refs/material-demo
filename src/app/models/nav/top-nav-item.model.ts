import { SideNavMenu } from './side-nav-menu.model';

export interface TopNavItem {
    id?: number;
    menuLink?: string;
    menuName: string;
    orderValue?: number;
    selected?: boolean;
    childs?: SideNavMenu[];
    [key: string]: any;
}
