import { Directive, Input, TemplateRef } from '@angular/core';

/**
 * TEMPLATE DIRECTIVE
 */
@Directive({
  selector: '[fusionUiTemplate]',
})
export class TemplateDirective {
  /**
   * Determines the name of the template.
   * Used to help differentiate/ dictate where the template content should be projected.
   */
  @Input('fusionUiTemplate') name: string;

  /**
   * Determines the type of the template.
   * Used to help differentiate/ dictate where the template content should be projected.
   */
  @Input() type: string;

  /**
   * Determines the custom attributes of the template.
   * Used to pass in additional data and configuration options.
   */
  @Input() attributes: { [key: string]: any };

  constructor(public template: TemplateRef<any>) {}

  /**
   * Gets the name of the template,
   *
   * @returns The name of the template.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Gets the type of the template.
   *
   * @returns The type of the template.
   */
  getType(): string {
    return this.type;
  }

  /**
   * Get the custom attributes added to the template.
   *
   * @returns The attributes of the template.
   */
  getAttributes(): { [key: string]: any } {
    return this.attributes;
  }
}
