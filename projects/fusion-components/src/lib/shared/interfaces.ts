import { StringKeyObject } from './utilities';

export enum FusionUiState {
  LOADING = 'loading',
  LOADED = 'loaded',
  NOT_LOADED = 'not-loaded',
  NO_RESULTS = 'no-results',
  ERROR = 'error',
}

export enum FusionUiSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
  X_SMALL = 'xSmall',
}

export enum FusionUiLocation {
  TOP = 'top',
  TOP_LEFT = 'topLeft',
  TOP_RIGHT = 'topRight',

  BOTTOM = 'bottom',
  BOTTOM_LEFT = 'bottomLeft',
  BOTTOM_RIGHT = 'bottomRight',

  LEFT = 'left',
  LEFT_TOP = 'leftTop',
  LEFT_BOTTOM = 'leftBottom',

  RIGHT = 'right',
  RIGHT_TOP = 'rightTop',
  RIGHT_BOTTOM = 'rightBottom',

  CENTER = 'center',
}

export enum BytesUnit {
  B = 'B',
  KB = 'KB',
  MB = 'MB',
  GB = 'GB',
  TB = 'TB',
  PB = 'PB',
  EB = 'EB',
  ZB = 'ZB',
  YB = 'YB',
}

export enum BiBytesUnit {
  B = 'B',
  KIB = 'KiB',
  MIB = 'MiB',
  GIB = 'GiB',
  TIB = 'TiB',
  PIB = 'PiB',
  EIB = 'EiB',
  ZIB = 'ZiB',
  YIB = 'YiB',
}

export enum FusionUiPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export interface FusionUiPositionConfig {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
}

export enum MouseInteraction {
  CLICK = 'click',
  MOUSE_DOWN = 'mousedown',
  MOUSE_UP = 'mouseup',
  MOUSE_ENTER = 'mouseenter',
  MOUSE_LEAVE = 'mouseleave',
  FOCUS = 'focus',
  BLUR = 'blur',
}

export enum FusionUiStatusLevel {
  UNKNOWN = 0,
  BASE = 1,
  NORMAL = 2,
  SUCCESS = 3,
  WARNING = 4,
  ERROR = 5,
  CRITICAL = 6,
}

export type FusionUIStatusLevelTranslations = {
  [key in FusionUiStatusLevel]?: string;
};

export const DEFAULT_FUSION_UI_STATUS_LEVEL_TRANSLATIONS: FusionUIStatusLevelTranslations = {
  [FusionUiStatusLevel.UNKNOWN]: 'Unknown',
  [FusionUiStatusLevel.BASE]: 'Base',
  [FusionUiStatusLevel.NORMAL]: 'Normal',
  [FusionUiStatusLevel.SUCCESS]: 'Success',
  [FusionUiStatusLevel.WARNING]: 'Warning',
  [FusionUiStatusLevel.ERROR]: 'Error',
  [FusionUiStatusLevel.CRITICAL]: 'Critical',
};

export enum FormInputStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  PENDING = 'PENDING',
  DISABLED = 'DISABLED'
}

export const FusionUiEnums: StringKeyObject = {
  BiBytesUnit,
  BytesUnit,
  FormInputStatus,
  FusionUiLocation,
  FusionUiPosition,
  FusionUiSize,
  FusionUiState,
  FusionUiStatusLevel,
  MouseInteraction,
};
