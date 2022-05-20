import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { TemplateDirective } from '@fusion-components/lib/directives/template';
import { DocumentClickService } from '@fusion-components/lib/services/document-click';
import { Location, Size } from '@fusion-components/lib/shared';

import { MenuAria, MenuTemplate } from './menu.interface';

interface WidthAndHeightAttributes {
  width?: number;
  height?: number;
}

/**
 * MENU COMPONENT
 *
 * The menu component provides the structure and styling for menus. Primarily developed for the actions menu for the table
 * component, but should be used for any menu-like dialogs/ popups.
 */
@Component({
  selector: 'f-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
})
export class MenuComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {
  readonly Location = Location;
  readonly Size = Size;

  readonly SPACING_FROM_BUTTON: number = 4;

  subscriptions: Subscription[] = [];

  menuDialogClasses: string[];

  private _menuButton: TemplateRef<any>;
  get menuButton(): TemplateRef<any> {
    return this._menuButton;
  }

  private _menuDialogHeader: TemplateRef<any>;
  get menuDialogHeader(): TemplateRef<any> {
    return this._menuDialogHeader;
  }

  private _menuDialogContent: TemplateRef<any>;
  get menuDialogContent(): TemplateRef<any> {
    return this._menuDialogContent;
  }

  private _buttonSizes: WidthAndHeightAttributes = {};
  get buttonSizes(): WidthAndHeightAttributes {
    return this._buttonSizes;
  }

  private _dialogSizes: WidthAndHeightAttributes = {};
  get dialogSizes(): WidthAndHeightAttributes {
    return this._dialogSizes;
  }

  /**
   * Determines whether or not to render the menu dialog.
   * If true, emit menuOpened, otherwise, emit menuClosed.
   */
  private _isMenuDialogOpen: boolean;
  @Input()
  set isMenuDialogOpen(isOpen: boolean) {
    if (this._isMenuDialogOpen !== isOpen) {
      isOpen ? this.menuOpened.emit() : this.menuClosed.emit();
    }
    this._isMenuDialogOpen = isOpen;
  }
  get isMenuDialogOpen(): boolean {
    return this._isMenuDialogOpen;
  }

  /**
   * Allows the addition of custom CSS classes to the dialog element.
   */
  @Input() dialogClasses: string[] = [];

  /**
   * Determines the location of the dialog element in reference to the button element.
   */
  @Input() dialogLocation: Location = Location.TOP;

  /**
   * Sets a min width on the dialog element.
   */
  @Input() dialogMinWidth: string;

  /**
   * Sets a max height on the dialog content.
   */
  @Input() dialogContentMaxHeight: string;

  /**
   * Sets a z-index of the dialog content in case it is having trouble displaying correctly over certain elements.
   * Should avoid changing this value if possible.
   */
  @Input() dialogZIndex: number = 1;

  /**
   * Sets the text to the displayed for the various aria attributes.
   */
  @Input() aria: MenuAria = {
    closeButtonLabel: 'Close menu dialog',
  };

  /**
   * Determines whether or not the (optional) header close button is autofocused when the menu dialog is opened.
   * Otherwise, it is best practice to set the desired autofocused element (if any) by using the fusionUiAutofocus directive.
   */
  @Input() isCloseButtonAutofocused: boolean;

  /**
   * Appends additional logic to the createMenuDialogSubscription() logic.
   */
  @Input() clickTargetFunction: (target: HTMLElement) => boolean;

  /**
   * Emits when the menu is closed.
   */
  @Output() menuClosed: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Emits when the menu is opened.
   */
  @Output() menuOpened: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('fusionUiMenu', { read: ElementRef }) fusionUiMenu: ElementRef;

  @ViewChild('fusionUiMenuButton', { read: ElementRef })
  set menuButtonSizing(menuButton: ElementRef) {
    if (!!menuButton) {
      this._buttonSizes = {
        height: menuButton.nativeElement.offsetHeight,
        width: menuButton.nativeElement.offsetWidth,
      };
    }
  }

  private _fusionUiMenuDialog: ElementRef;
  @ViewChild('fusionUiMenuDialog', { read: ElementRef })
  set fusionUiMenuDialog(menuDialog: ElementRef) {
    if (!!menuDialog) {
      this._fusionUiMenuDialog = menuDialog;
      this._dialogSizes = {
        height: menuDialog.nativeElement.offsetHeight,
        width: menuDialog.nativeElement.offsetWidth,
      };
      this.setDialogPositioning();
    }
  }
  get fusionUiMenuDialog(): ElementRef {
    return this._fusionUiMenuDialog;
  }

  @ContentChildren(TemplateDirective) templates !: QueryList<TemplateDirective>;

  constructor(
    private documentClickService: DocumentClickService,
  ) {}

  /**
   * On component initialization, create a subscription to the documentClickService.
   */
  ngOnInit(): void {
    this.createMenuDialogSubscription();
  }

  /**
   * After the component's content initializes, attempt to find certain elements with TemplateDirectives
   * to figure out what content should be rendered where.
   */
  ngAfterContentInit(): void {
    this.templates.forEach((item: TemplateDirective) => {
      const name: string = item.getName();

      switch (name) {
        case MenuTemplate.MENU_BUTTON:
          this._menuButton = item.template;
          break;
        case MenuTemplate.MENU_DIALOG_HEADER:
          this._menuDialogHeader = item.template;
          break;
        case MenuTemplate.MENU_DIALOG_CONTENT:
          this._menuDialogContent = item.template;
          break;
      }
    });
  }

  /**
   * Updae eiher the list of classes or the dialog positioning when one of those input changes
   *
   * @param c input changes
   */
  ngOnChanges(c: SimpleChanges): void {
    if (c['dialogClasses']) {
      this.menuDialogClasses = this.generateDialogClasses();
    }

    if (c['dialogLocation'] && this._fusionUiMenuDialog) {
      this.setDialogPositioning();
    }
  }

  /**
   * When a component is being torn down, unsubscribe from all active subscriptions.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  /**
   * Creates a subscription to the documentClickService to check if the user 'clicks' outside of the menu component.
   * If the click is NOT a child of the menu component, close the menu dialog.
   */
  createMenuDialogSubscription(): void {
    this.subscriptions.push(
      this.documentClickService.documentClickedTarget$.subscribe((target: HTMLElement) => {
        const customLogicResult: boolean = !!this.clickTargetFunction ? this.clickTargetFunction(target) : false;

        const isElementOutsideDialogOrNotRemoveFilterButton: boolean =
          this.isMenuDialogOpen &&
          !!this.fusionUiMenu &&
          !(this.fusionUiMenu.nativeElement.contains(target) ||
          !!target.closest('.f-menu__dialog') ||
          customLogicResult);

        if (isElementOutsideDialogOrNotRemoveFilterButton) {
          this.closeMenuDialog();
        }
      })
    );
  }

  /**
   * Sets the position of the menu dialog based on two (2) factors:
   *  1. the sizes of the button (that triggers the menu opening) and the menu dialog itself
   *  2. the provided dialogLocation input
   *
   */
  // eslint-disable-next-line complexity
  setDialogPositioning(): void {
    const setStyling = (
      styles: {
        top?: string,
        bottom?: string,
        left?: string,
        right?: string,
        transform?: string,
      }
    ): void => {
      this._fusionUiMenuDialog.nativeElement.style.top = styles.top;
      this._fusionUiMenuDialog.nativeElement.style.bottom = styles.bottom;
      this._fusionUiMenuDialog.nativeElement.style.left = styles.left;
      this._fusionUiMenuDialog.nativeElement.style.right = styles.right;
      this._fusionUiMenuDialog.nativeElement.style.transform = styles.transform;
    };

    switch (this.dialogLocation) {
      case Location.TOP:
        setStyling({
          bottom: `${this.buttonSizes.height! + this.SPACING_FROM_BUTTON}px`,
          left: `${this.buttonSizes.width! / 2}px`,
          transform: 'translateX(-50%)',
        });
        break;
      case Location.TOP_LEFT:
        setStyling({
          bottom: `${this.buttonSizes.height! + this.SPACING_FROM_BUTTON}px`,
          left: '0px',
        });
        break;
      case Location.TOP_RIGHT:
        setStyling({
          bottom: `${this.buttonSizes.height! + this.SPACING_FROM_BUTTON}px`,
          right: '0px',
        });
        break;

      case Location.BOTTOM:
        setStyling({
          top: `${this.buttonSizes.height! + this.SPACING_FROM_BUTTON}px`,
          left: `${this.buttonSizes.width! / 2}px`,
          transform: 'translateX(-50%)',
        });
        break;
      case Location.BOTTOM_LEFT:
        setStyling({
          top: `${this.buttonSizes.height! + this.SPACING_FROM_BUTTON}px`,
          left: '0px',
        });
        break;
      case Location.BOTTOM_RIGHT:
        setStyling({
          top: `${this.buttonSizes.height! + this.SPACING_FROM_BUTTON}px`,
          right: '0px',
        });
        break;

      case Location.LEFT:
        setStyling({
          top: `${this.buttonSizes.height! / 2}px`,
          right: `${this.buttonSizes.width! + this.SPACING_FROM_BUTTON}px`,
          transform: 'translateY(-50%)',
        });
        break;
      case Location.LEFT_TOP:
        setStyling({
          top: '0px',
          right: `${this.buttonSizes.width! + this.SPACING_FROM_BUTTON}px`,
        });
        break;
      case Location.LEFT_BOTTOM:
        setStyling({
          bottom: '0px',
          right: `${this.buttonSizes.width! + this.SPACING_FROM_BUTTON}px`,
        });
        break;

      case Location.RIGHT:
        setStyling({
          top: `${this.buttonSizes.height! / 2}px`,
          left:  `${this.buttonSizes.width! + this.SPACING_FROM_BUTTON}px`,
          transform: 'translateY(-50%)',
        });
        break;
      case Location.RIGHT_TOP:
        setStyling({
          top: '0px',
          left: `${this.buttonSizes.width! + this.SPACING_FROM_BUTTON}px`,
        });
        break;
      case Location.RIGHT_BOTTOM:
        setStyling({
          bottom: '0px',
          left: `${this.buttonSizes.width! + this.SPACING_FROM_BUTTON}px`,
        });
        break;

      case Location.CENTER:
        setStyling({
          top: `${this.buttonSizes.height! / 2}px`,
          left: `${this.buttonSizes.width! / 2}px`,
          transform: 'translate(-50%, -50%)',
        });
        break;
    }
  }

  /**
   * Closes the menu dialog and emits an event for the parent component to use.
   */
  closeMenuDialog(): void {
    this.isMenuDialogOpen = false;
    this.menuClosed.emit();
  }

  /**
   * Generates the CSS classes to be appended to the menu dialog element.
   *
   * @returns an array of CSS classes
   */
  generateDialogClasses(): string[] {
    const classes: string[] = [];

    if (!!this.dialogLocation) {
      classes.push(`f-menu__dialog--location-${this.dialogLocation}`);
    }

    classes.push(...this.dialogClasses);

    return classes;
  }
}
