import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, TemplateRef } from '@angular/core';

import { isEqual } from 'lodash-es';

import { Location, Size } from '@fusion-components/lib/shared';

import { ButtonType } from '../../button';
import { TableRowData } from '../table.interface';
import { DEFAULT_TABLE_ACTIONS_TRANSLATIONS, TableActionsTranslations } from './table-actions.interface';

@Component({
    selector: 'f-table-actions',
    templateUrl: './table-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TableActionsComponent implements DoCheck {
  readonly Location = Location;
  readonly Size = Size;
  readonly ButtonType = ButtonType;

  readonly dialogPosition: Location = Location.BOTTOM_RIGHT;

  isMenuDialogOpen: boolean;
  cssClasses: string[] = ['f-table__actions-dialog'];

  /**
   * The data of the row that is used in the custom content.
   */
  private _prevRowData: TableRowData;
  @Input() rowData: TableRowData;

  /**
   * The custom content to be displayed within the menu dialog.
   */
  private _prevTemplateRef: TemplateRef<any> | null;
  @Input() templateRef: TemplateRef<any> | null;

  /**
   * Determines whether or not the whole button is disabled.
   */
  private _prevIsDisabled: boolean;
  @Input() isDisabled: boolean;

  /**
   * Determines the default "static" text for the actions menu.
   */
  private _prevTranslations: TableActionsTranslations = DEFAULT_TABLE_ACTIONS_TRANSLATIONS;
  @Input() translations: TableActionsTranslations = DEFAULT_TABLE_ACTIONS_TRANSLATIONS;

  /**
   * Determines any custom css classes to be appended to menu dialog/ popup.
   */
  private _prevDialogCssClasses: string[] = [];
  private _dialogCssClasses: string[] = [];
  @Input() 
  set dialogCssClasses(classes: string[]) {
    this._dialogCssClasses = classes || [];
  }
  get dialogCssClasses(): string[] {
    return this._dialogCssClasses;
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  /**
   * Checks to see if the provided inputs have actually changed. If so, mark the component
   * to be checked and re-rendered.
   */
  ngDoCheck(): void {
    let didAnythingChange: boolean = false;

    if (!isEqual(this.rowData, this._prevRowData)) {
      this._prevRowData = this.rowData;
      didAnythingChange = true;
    }

    if (!isEqual(this.templateRef, this._prevTemplateRef)) {
      this._prevTemplateRef = this.templateRef;
      didAnythingChange = true;
    }

    if (this.isDisabled !== this._prevIsDisabled) {
      this._prevIsDisabled = this.isDisabled;
      didAnythingChange = true;
    }

    if (!isEqual(this.translations, this._prevTranslations)) {
      this._prevTranslations = this.translations;
      didAnythingChange = true;
    }

    if (!isEqual(this.dialogCssClasses, this._prevDialogCssClasses)) {
      this._prevDialogCssClasses = this.dialogCssClasses;
      this.cssClasses = ['f-table__actions-dialog', ...this.dialogCssClasses];
      didAnythingChange = true;
    }

    if (didAnythingChange) {
      this.changeDetectorRef.markForCheck();
    }
  }
}
