import { Size, StatusLevel } from '../../shared';

export interface BadgeConfig {
  type?: StatusLevel;
  size?: Size;
  text?: string | number;
  subText?: string | number;
}

export interface BadgeStyling {
  [key: string]: any;
}
