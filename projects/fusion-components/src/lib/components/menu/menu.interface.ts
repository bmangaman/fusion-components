export interface MenuAria {
  closeButtonLabel?: string;
  menuDialogLabelledBy?: string;
}

export enum MenuTemplate {
  MENU_BUTTON = 'menuButton',
  MENU_DIALOG_HEADER = 'menuDialogHeader',
  MENU_DIALOG_CONTENT = 'menuDialogContent',
}
