import { Observable } from 'rxjs';

export interface NavItem {
  id?: string;
  title?: string | Observable<string>;
  text?: string | Observable<string>;
  icon?: string;
  isExpanded?: boolean;
  isDisabled?: boolean;
  isSelected?: boolean;
  isPathMatchFull?: boolean;
  href?: string;
  route?: string;
  children?: NavItem[];
  index?: number;
  target?: string;
}

export enum SidenavTemplate {
  TOP = 'sidenavTop',
  BOTTOM = 'sidenavBottom',
}
