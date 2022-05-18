import { NgModule } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { FusionComponentsTranslationService } from '../lib/services';

/**
 * Module created for the sole purpose of making it easy to set up the test config for
 * a component that extends the TranslatedComponent.
 *
 * Just make sure to add it to the imports of the configureTestingModule, like:
 *
 * @example
 * beforeEach(async(() => {
 *   TestBed.configureTestingModule({
 *     declarations: [
 *       TableTestComponent,
 *     ],
 *     imports: [
 *       TableModule,
 *       TranslatedComponentSpecModule,
 *     ],
 *   }).compileComponents();
 * }));
 */
@NgModule({
  imports: [
    TranslateModule.forRoot({}),
  ],
  exports: [
    TranslateModule,
  ],
  providers: [
    TranslateService,
    FusionComponentsTranslationService,
  ],
})
export class TranslatedComponentSpecModule {}
