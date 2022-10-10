import { ComponentRef, Injectable } from '@angular/core';

import { cloneDeep } from 'lodash-es';

import { TooltipComponent } from '../../components/tooltip';
import { DomService } from '../dom';
import { TooltipConfig } from './tooltip.interface';

/**
 * TOOLTIP SERVICE
 *
 * The Tooltip Services is to be used in conjunction with the Tooltip Component and Tooltip Directive.
 * The Tooltip Service is used to append, remove, and keep track of tooltips.
 */
@Injectable({ providedIn: 'root' })
export class TooltipService {
  private _components: TooltipConfig[] = [];
  get components(): TooltipConfig[] {
    return cloneDeep(this._components);
  }

  constructor(
    private domService: DomService,
  ) {}

  /**
   * Adds the provided TooltipConfig to the list of visible tooltips.
   *
   * @param config The configuration of the tooltip component.
   */
  addTooltip(config: TooltipConfig): void {
    const component: ComponentRef<any> = this.domService.createComponent(TooltipComponent, config);
    const appendedElement: HTMLElement = this.domService.attachComponent(component, 'body');
    this._components.push({ ...config, appendedElement });
  }

  /**
   * Removes the TooltipConfig from the list based on the provided id.
   *
   * @param id The id of the tooltip component.
   */
  removeTooltip(id: string): void {
    const index: number = this._components.findIndex((component: TooltipConfig) => component.id === id);

    if (index > -1) {
      const appendedComponent: HTMLElement | undefined = this._components[index].appendedElement;

      if (appendedComponent) {
        this.domService.removeComponent(appendedComponent);
      }

      this._components.splice(index, 1);
    }
  }

  /**
   * Used to determine whether or not a tooltip with the provided ID is currently displayed.
   *
   * @param id The ID of the tooltip.
   * @returns True if a tooltip with the provided id exists, false otherwise.
   */
  isTooltipDisplayed(id: string): boolean {
    return this._components.some((component: TooltipConfig) => component.id === id);
  }
}
