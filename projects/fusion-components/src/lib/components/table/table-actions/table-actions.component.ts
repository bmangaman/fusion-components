import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, TemplateRef } from '@angular/core';

import { isEqual } from 'lodash';

import { FusionComponentsTranslationService } from '@fusion-ui/fusion-components/lib/services/translation';
import { FusionUiLocation, FusionUiSize, TranslatedComponent } from '@fusion-ui/fusion-components/lib/shared';

import { ButtonType } from '../../button';
import { TableRowData } from '../table.interface';
import { TableActionsTranslations } from './table-actions.interface';

@Component({
  selector: 'fusion-ui-table-actions',
  templateUrl: './table-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableActionsComponent extends TranslatedComponent implements DoCheck {
  readonly FusionUiLocation = FusionUiLocation;
  readonly FusionUiSize = FusionUiSize;
  readonly ButtonType = ButtonType;

  readonly dialogPosition: FusionUiLocation = FusionUiLocation.BOTTOM_RIGHT;

  isMenuDialogOpen: boolean;
  cssClasses: string[] = ['fusion-ui-table__actions-dialog'];

  /**
   * The data of the row that is used in the custom content.
   */
  private _prevRowData: TableRowData;
  @Input() rowData: TableRowData;

  /**
   * The custom content to be displayed within the menu dialog.
   */
  private _prevTemplateRef: TemplateRef<any>;
  @Input() templateRef: TemplateRef<any>;

  /**
   * Determines whether or not the whole button is disabled.
   */
  private _prevIsDisabled: boolean;
  @Input() isDisabled: boolean;

  /**
   * Determines the default "static" text for the actions menu.
   */
  private _prevTranslations: TableActionsTranslations;
  @Input() translations: TableActionsTranslations;

  /**
   * Determines any custom css classes to be appended to menu dialog/ popup.
   */
  private _prevDialogCssClasses: string[];
  @Input() dialogCssClasses: string[];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    protected _translationService: FusionComponentsTranslationService,
  ) {
    super(_translationService);
  }

  /**
   * Checks to see if the provided inputs have actually changed. If so, mark the component
   * to be checked and re-rendered.
   */
  ngDoCheck(): void {
    let didAnythingChange: boolean;

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
      this.cssClasses = ['fusion-ui-table__actions-dialog', ...this.dialogCssClasses];
      didAnythingChange = true;
    }

    if (didAnythingChange) {
      this.changeDetectorRef.markForCheck();
    }
  }
}
