import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface KeyValueTableData {
  key: string;
  keyText: string | Observable<string>;
  value: any;
  keyTemplate?: TemplateRef<any>;
  valueTemplate?: TemplateRef<any>;
}

export enum KeyValueTableType {
  KEY = 'key',
  VALUE = 'value',
}
