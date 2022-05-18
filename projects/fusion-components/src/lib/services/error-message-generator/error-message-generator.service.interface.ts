import { SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';

export interface ErrorMessageGeneratorTranslationConfig {
  [key: string]: any;
  isPlural?: boolean;
}

export interface ErrorMessageGeneratorConfig {
  priority?: number;
  translation?: Observable<string | SafeHtml>;
  translationConfig?: ErrorMessageGeneratorTranslationConfig;
  error?: string;
}

export interface ErrorMessageMinlengthGeneratorConfig extends ErrorMessageGeneratorConfig {
  translationConfig?: { min: string | number, isPlural: boolean };
}

export interface ErrorMessageMaxlengthGeneratorConfig extends ErrorMessageGeneratorConfig {
  translationConfig?: { max: string | number, isPlural: boolean };
}
