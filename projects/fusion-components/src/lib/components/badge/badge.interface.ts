import { FusionUiSize, FusionUiStatusLevel } from '../../shared';

export interface BadgeConfig {
  type?: FusionUiStatusLevel;
  size?: FusionUiSize;
  text?: string | number;
  subText?: string | number;
}

export interface BadgeStyling {
  [key: string]: any;
}
