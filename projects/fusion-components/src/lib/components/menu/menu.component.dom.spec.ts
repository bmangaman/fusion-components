import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Location } from '../../shared';

import { MenuComponentPageObject } from './menu.component.spec.po';
import { MenuAria } from './menu.interface';
import { MenuModule } from './menu.module';

@Component({
  selector: 'f-test-component',
  template: `
    <div style="width: 500px; height: 500px; position: relative; display: flex; align-items: center; justify-content: center;">
      <f-menu
        [isMenuDialogOpen]="isMenuDialogOpen"
        [dialogLocation]="dialogLocation"
        [dialogClasses]="dialogClasses"
        [dialogMinWidth]="dialogMinWidth"
        [dialogContentMaxHeight]="dialogContentMaxHeight"
        [dialogZIndex]="dialogZIndex"
        [aria]="aria"
        (menuClosed)="menuClosed()"
        (menuOpened)="menuOpened()">
        <ng-template fusionUiTemplate="menuButton">
          <button (click)="isMenuDialogOpen = !isMenuDialogOpen">Open Menu</button>
        </ng-template>
        <ng-template fusionUiTemplate="menuDialogHeader">Menu Dialog Header</ng-template>
        <ng-template fusionUiTemplate="menuDialogContent">Menu Dialog Content</ng-template>
      </f-menu>
    </div>
  `,
})
export class MenuTestComponent {
  isMenuDialogOpen: boolean = false;
  dialogLocation: Location = Location.TOP;
  dialogClasses: string[] = [];
  dialogMinWidth: string = '100px';
  dialogContentMaxHeight: string = '300px';
  dialogZIndex: number = 2;
  aria: MenuAria;

  menuClosed(): void {
    this.isMenuDialogOpen = false;
  }
  menuOpened(): void {}
}

describe('MenuComponent', () => {
  let component: MenuTestComponent;
  let fixture: ComponentFixture<MenuTestComponent>;
  let page: MenuComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuTestComponent,
      ],
      imports: [
        MenuModule,
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(MenuTestComponent);
    component = fixture.componentInstance;
    page = new MenuComponentPageObject(fixture);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('the menu button', () => {
    it('should display the correct button content', () => {
      expect(page.menu.menuButtonContainer).toBeTruthy();
      expect(page.menu.menuButton).toBeTruthy();
      expect(page.menu.menuButton.innerText).toEqual('Open Menu');
    });
  });

  describe('the menu dialog', () => {
    it('should be displayed when isMenuDialogOpen is true', () => {
      component.isMenuDialogOpen = false;
      fixture.detectChanges();
      expect(page.menu.menuDialog).toBeFalsy();

      component.isMenuDialogOpen = true;
      fixture.detectChanges();
      expect(page.menu.menuDialog).toBeTruthy();
    });

    it('should append the provided dialogClasses', () => {
      component.dialogClasses = ['custom-class-1', 'custom-class-2'];
      component.isMenuDialogOpen = true;
      fixture.detectChanges();
      expect(page.menu.menuDialog).toBeTruthy();
      expect(page.menu.menuDialog.classList).toContain('custom-class-1');
      expect(page.menu.menuDialog.classList).toContain('custom-class-2');
    });

    it('should emit menuOpened when the menu is opened, menuClosed if closed', () => {
      spyOn(component, 'menuClosed').and.callThrough();
      spyOn(component, 'menuOpened').and.callThrough();
      component.isMenuDialogOpen = false;
      fixture.detectChanges();

      component.isMenuDialogOpen = true;
      fixture.detectChanges();
      expect(component.menuOpened).toHaveBeenCalled();

      component.isMenuDialogOpen = false;
      fixture.detectChanges();
      expect(component.menuClosed).toHaveBeenCalled();
    });

    it('should display the correct dialoag header content', () => {
      component.isMenuDialogOpen = true;
      fixture.detectChanges();
      expect(page.menu.menuDialog).toBeTruthy();
      expect(page.menu.menuDialogHeader).toBeTruthy();
      expect(page.menu.menuDialogHeader.innerText).toEqual('Menu Dialog Header');
    });

    it('should close the dialog when the close button in the header is clicked', () => {
      component.isMenuDialogOpen = true;
      fixture.detectChanges();
      expect(page.menu.menuDialog).toBeTruthy();
      expect(page.menu.menuDialogHeaderCloseButton).toBeTruthy();
      page.menu.menuDialogHeaderCloseButton.click();
      fixture.detectChanges();
      expect(component.isMenuDialogOpen).toBeFalsy();
      expect(page.menu.menuDialog).toBeFalsy();
    });

    it('should display the correct dialog inner content', () => {
      component.isMenuDialogOpen = true;
      fixture.detectChanges();
      expect(page.menu.menuDialog).toBeTruthy();
      expect(page.menu.menuDialogContent).toBeTruthy();
      expect(page.menu.menuDialogContent.innerText).toEqual('Menu Dialog Content');
    });
  });
});
