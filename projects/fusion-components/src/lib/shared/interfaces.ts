export enum State {
  LOADING = 'loading',
  LOADED = 'loaded',
  NOT_LOADED = 'not-loaded',
  NO_RESULTS = 'no-results',
  ERROR = 'error',
}

export enum Size {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
  X_SMALL = 'xSmall',
}

export enum Location {
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

export enum Position {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export interface PositionConfig {
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

export enum StatusLevel {
  UNKNOWN = 0,
  BASE = 1,
  NORMAL = 2,
  SUCCESS = 3,
  WARNING = 4,
  ERROR = 5,
  CRITICAL = 6,
}

export type FusionUIStatusLevelTranslations = {
  [key in StatusLevel]?: string;
};

export const DEFAULT_STATUS_LEVEL_TRANSLATIONS: FusionUIStatusLevelTranslations = {
  [StatusLevel.UNKNOWN]: 'Unknown',
  [StatusLevel.BASE]: 'Base',
  [StatusLevel.NORMAL]: 'Normal',
  [StatusLevel.SUCCESS]: 'Success',
  [StatusLevel.WARNING]: 'Warning',
  [StatusLevel.ERROR]: 'Error',
  [StatusLevel.CRITICAL]: 'Critical',
};

export enum FormInputStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  PENDING = 'PENDING',
  DISABLED = 'DISABLED'
}

export const Enums: Record<string, any> = {
  BiBytesUnit,
  BytesUnit,
  FormInputStatus,
  Location,
  Position,
  Size,
  State,
  StatusLevel,
  MouseInteraction,
};
