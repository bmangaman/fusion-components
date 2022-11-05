import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';

import { DomService, ModalService, SidenavModule, TooltipService, TranslationService, WindowProvider } from '@fusion-components';

import { UploadDemoInterceptor } from './demos/components/upload-demo/upload-demo.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// AoT requires an exported function for factories
export class LazyTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(import(`../i18n/${lang}.json`));
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: LazyTranslateLoader
      }
    }),

    SidenavModule,
  ],
  providers: [
    WindowProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UploadDemoInterceptor,
      multi: true,
    },
    DomService,
    ModalService,
    TooltipService,
    TranslationService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
