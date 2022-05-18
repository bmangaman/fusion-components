import { PipeTransform } from '@angular/core';

export interface PipeItem {
  pipe: PipeTransform;
  values?: any[];
}
