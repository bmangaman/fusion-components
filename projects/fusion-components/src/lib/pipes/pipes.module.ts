import { NgModule } from '@angular/core';

import { BytesModule } from './bytes';
import { EnumToArrayModule } from './enum-to-array';
import { GetStatusLevelTextModule } from './get-status-level-text';
import { MetaModule } from './meta';
import { ObjectKeysModule } from './object-keys';
import { PercentMapModule } from './percent-map';
import { PercentageModule } from './percentage';
import { ToCssClassModule } from './to-css-class';

@NgModule({
  exports: [
    BytesModule,
    EnumToArrayModule,
    MetaModule,
    GetStatusLevelTextModule,
    ObjectKeysModule,
    PercentageModule,
    PercentMapModule,
    ToCssClassModule,
  ],
})
export class PipesModule {}
