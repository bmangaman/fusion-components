import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { Observable } from 'rxjs';

import { TemplateDirective } from '../../directives/template';
import { KeyValueTableData, KeyValueTableType } from './key-value-table.interface';

/**
 * KEY VALUE TABLE COMPONENT
 *
 * The Key Value Table Component creates a consistent way to display simple kay-value data.
 */
@Component({
    selector: 'f-key-value-table',
    templateUrl: 'key-value-table.component.html',
    standalone: false
})
export class KeyValueTableComponent implements AfterContentInit {
  readonly Observable = Observable;

  /**
   * Determines the data to be diplayed in the table.
   */
  @Input() data: KeyValueTableData[] = [];

  /**
   * A list of all the TemplateDirectives nested within this component.
   * Used to generate the the custom key and/ or value content for each data row.
   */
  @ContentChildren(TemplateDirective) templates !: QueryList<TemplateDirective>;

  /**
   * After the component's content initializes, attempt to find certain elements with TemplateDirectives
   * to figure out what content should be rendered where.
   *
   * Loops through the provided data to match the custom templates to the data keys.
   *
   * @example
   * <f-key-value-table [data]="generatedData">
   *   <ng-template fusionUiTemplate="hostname" [type]="KeyValueTable.KEY" let-data>
   *     <i class="mdi mdi-home"></i>{{ data?.key }}
   *   </ng-template>
   *
   *   <ng-template fusionUiTemplate="numOfDrives" [type]="KeyValueTableType.VALUE" let-data>
   *     <i class="mdi mdi-database"></i>{{ data?.value }}
   *   </ng-template>
   * </f-key-value-table>
   */
  ngAfterContentInit(): void {
    this.templates.forEach((item: TemplateDirective) => {
      const name: string = item.getName();
      const type: string = item.getType();

      this.data.forEach((data: KeyValueTableData) => {
        if (!!data && name.includes(data.key)) {
          if (type === KeyValueTableType.KEY) {
            data.keyTemplate = item.template;
          }
          if (type === KeyValueTableType.VALUE) {
            data.valueTemplate = item.template;
          }
        }
      });
    });
  }
}
