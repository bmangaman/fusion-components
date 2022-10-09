import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

import { get } from 'lodash';

import { StateComponent, StateHeadlines, StateLocation, StateMessages, StateMessageTemplates } from '../../components/state';
import { State } from '../../shared';

/**
 * FUSION UI STATE DIRECTIVE
 *
 * This directive provides a consistent way to handle common states such as LOADING, ERROR, NO_RESULTS, AND LOADED.
 * This directive uses pre-made conponents for the LOADING, ERROR, and NO_RESULTS states by default, but they can be replaced
 * with custom content. The LOADED state displays the content within the element to which the directive is applied.
 *
 * @example
 * <div
 *   *fusionUiState="stateForm?.get('state')?.value;
 *      error:customErrorState;
 *      loading:customLoadingState;
 *      noResults:customNoResultsState;
 *      notLoaded:customNotLoadedState"
 *   class="example-host-class example-host-class-2">
 *   LOADED CONTENT
 * </div>
 *
 * <ng-template #customErrorState>
 *   <div>CUSTOM ERROR STATE</div>
 * </ng-template>
 *
 * <ng-template #customLoadingState>
 *   <div>CUSTOM LOADING STATE</div>
 * </ng-template>
 *
 * <ng-template #customNoResultsState>
 *   <div>CUSTOM NO RESULTS STATE</div>
 * </ng-template>
 *
 * <ng-template #customNotLoadedState>
 *   <div>CUSTOM NOT LOADED STATE</div>
 * </ng-template>
 *
 */
@Directive({
  selector: '[fusionUiState]',
})
export class StateDirective {
  private cssClasses: string[];

  /**
   * Determines the state of the content. When changed, generates the view.
   */
  private _state: State;
  @Input('fusionUiState')
  set state(state: State) {
    this._state = state;
    this.generateView();
  }

  /**
   * Determines the location of the content. Used to generate the State Component.
   */
  private _location: StateLocation = StateLocation.GENERIC;
  @Input('fusionUiStateLocation')
  set location(location: StateLocation) {
    this._location = location;
    this.generateView();
  }

  /**
   * Determines the headlines of the non-loaded and -loaded states. Used to generate the State Component.
   */
  private _headlines: StateHeadlines;
  @Input('fusionUiStateHeadlines')
  set headlines(headline: StateHeadlines) {
    this._headlines = headline;
    this.generateView();
  }

  /**
   * Determines the messages of the non-loaded and -loaded states. Used to generate the State Component.
   */
  private _messages: StateMessages;
  @Input('fusionUiStateMessages')
  set messages(messages: StateMessages) {
    this._messages = messages;
    this.generateView();
  }

  /**
   * Determines the message templates of the non-loaded and -loaded states. Used to generate the State Component.
   */
  private _messageTemplates: StateMessageTemplates;
  @Input('fusionUiStateMessageTemplates')
  set messageTemplates(templates: StateMessageTemplates) {
    this._messageTemplates = templates;
    this.generateView();
  }

  /**
   * Determines the aria-label of loading spinner of the loading state. Used to generate the State Component.
   */
  private _loadingAriaLabel: string;
  @Input('fusionUiStateLoadingAriaLabel')
  set loadingAriaLabel(label: string) {
    this._loadingAriaLabel = label;
    this.generateView();
  }

  /**
   * Determines a custom loading state template. When changed, generate the view.
   *
   * IMPORTANT
   * The templae HAS to have a wrapping container element (cannot just be text). For example:
   * <ng-templae #stateLoading><div>Loading State Template Content</div></ng-template>
   */
  private _loadingState: TemplateRef<any> | null;
  @Input()
  set fusionUiStateLoading(state: TemplateRef<any> | null) {
    this._loadingState = state;
    this.generateView();
  }

  /**
   * Determines a custom no results state template. When changed, generates the view.
   *
   * IMPORTANT
   * The templae HAS to have a wrapping container element (cannot just be text). For example:
   * <ng-templae #stateNoResults><div>No Results State Template Content</div></ng-template>
   */
  private _noResultsState: TemplateRef<any> | null;
  @Input()
  set fusionUiStateNoResults(state: TemplateRef<any> | null) {
    this._noResultsState = state;
    this.generateView();
  }

  /**
   * Determines a custom error state template. When changed, generates the view.
   *
   * IMPORTANT
   * The templae HAS to have a wrapping container element (cannot just be text). For example:
   * <ng-templae #stateError><div>Error State Template Content</div></ng-template>
   */
  private _errorState: TemplateRef<any> | null;
  @Input()
  set fusionUiStateError(state: TemplateRef<any> | null) {
    this._errorState = state;
    this.generateView();
  }

  /**
   * Determines a custom not loaded state template. When changed, generates the view.
   *
   * IMPORTANT
   * The templae HAS to have a wrapping container element (cannot just be text). For example:
   * <ng-templae #stateNotLoaded><div>Not Loaded State Template Content</div></ng-template>
   */
  private _notLoadedState: TemplateRef<any> | null;
  @Input()
  set fusionUiStateNotLoaded(state: TemplateRef<any> | null) {
    this._notLoadedState = state;
    this.generateView();
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private factoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2,
  ) {}

  /**
   * Generates the view based on the current state and whether or not a custom template was provided.
   */
  generateView(): void {
    this.cssClasses = this.getClasses();
    this.viewContainer.clear();

    switch (this._state) {
      case State.LOADING:
        this.generateViewHelper(this._loadingState);
        break;
      case State.NO_RESULTS:
        this.generateViewHelper(this._noResultsState);
        break;
      case State.ERROR:
        this.generateViewHelper(this._errorState);
        break;
      case State.NOT_LOADED:
        this.generateViewHelper(this._notLoadedState);
        break;
      case State.LOADED:
      default:
        this.viewContainer.createEmbeddedView(this.templateRef);
        break;
    }

    const nextElementSibling: HTMLElement = get(this.viewContainer, 'element.nativeElement.nextElementSibling');
    if (!!nextElementSibling) {
      this.cssClasses.forEach((cssClass: string) => this.renderer.addClass(nextElementSibling, cssClass));
    }
  }

  /**
   * Helper function that either uses the custom state template or creates the StateComponent with the provided inputs
   * to be displayed if the state of the directive is anything other than LOADED.
   *
   * @param state The custom state template (e.g. _loadingState, _noResultsState, _errorState, _notLoadedState).
   */
  generateViewHelper(state: TemplateRef<any> | null): void {
    if (!!state) {
      this.viewContainer.createEmbeddedView(state);
    } else {
      const factory: ComponentFactory<StateComponent> = this.factoryResolver.resolveComponentFactory(StateComponent);
      const component: ComponentRef<StateComponent> = this.viewContainer.createComponent(factory);
      component.instance.state = this._state || component.instance.state;
      component.instance.location = this._location || component.instance.location;
      component.instance.headlines = this._headlines || component.instance.headlines;
      component.instance.messages = this._messages || component.instance.messages;
      component.instance.messageTemplates = this._messageTemplates || component.instance.messageTemplates;
      component.instance.loadingAriaLabel = this._loadingAriaLabel || component.instance.loadingAriaLabel;
    }
  }

  /**
   * Gets the CSS classes from the element to which the directive is applied.
   *
   * @returns The list of CSS classes to be appended.
   */
  getClasses(): string[] {
    const classList: DOMTokenList = get(this.viewContainer, 'element.nativeElement.nextElementSibling.classList');
    return !!classList && classList.length ? Array.from(classList).filter(Boolean) : [];
  }
}
