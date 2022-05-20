import { SimpleChange } from '@angular/core';

import { NavItem } from '../sidenav.interface';
import { NavItemComponent } from './nav-item.component';

describe('SidenavComponent', () => {
  let component: NavItemComponent;

  beforeEach(() => {
    component = new NavItemComponent();
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input()', () => {
    describe('id', () => {
      it('should set the id if the provided id is defined', () => {
        /* eslint-disable @typescript-eslint/dot-notation */
        component['_id'] = 'id';
        component.id = undefined;
        expect(component.id).toEqual('id');
        expect(component['_id']).toEqual('id');

        component.id = 'newId';
        expect(component.id).toEqual('newId');
        expect(component['_id']).toEqual('newId');
        /* eslint-enable @typescript-eslint/dot-notation */
      });
    });
  });

  describe('ngOnChanges()', () => {
    it('should call generateIconCssClasses() if the icon input changes', () => {
      spyOn(component, 'generateIconCssClasses').and.stub();
      component.icon = undefined;

      component.icon = 'mdi mdi-chevron-down';
      component.ngOnChanges({
        icon: new SimpleChange(null, component.icon, false),
      });
      expect(component.generateIconCssClasses).toHaveBeenCalled();
    });

    it('should call generateLinkCssClasses() if the children, isExpanded, or isDisabled inputs change', () => {
      spyOn(component, 'generateLinkCssClasses').and.stub();
      component.children = undefined;
      component.isExpanded = undefined;
      component.isDisabled = undefined;

      component.children = [];
      component.ngOnChanges({
        children: new SimpleChange(null, component.children, false),
      });
      expect(component.generateLinkCssClasses).toHaveBeenCalled();

      component.isExpanded = true;
      component.ngOnChanges({
        isExpanded: new SimpleChange(null, component.isExpanded, false),
      });
      expect(component.generateLinkCssClasses).toHaveBeenCalled();

      component.isDisabled = true;
      component.ngOnChanges({
        isDisabled: new SimpleChange(null, component.isDisabled, false),
      });
      expect(component.generateLinkCssClasses).toHaveBeenCalled();
    });
  });

  describe('toggleExpansion()', () => {
    beforeEach(() => {
      spyOn(component.expansionToggled, 'emit').and.stub();
      spyOn(component, 'generateLinkCssClasses').and.stub();
    });

    it('should do nothing if there are no children', () => {
      component.children = undefined;
      component.toggleExpansion();
      expect(component.expansionToggled.emit).not.toHaveBeenCalled();
      expect(component.generateLinkCssClasses).not.toHaveBeenCalled();

      component.children = [];
      component.toggleExpansion();
      expect(component.expansionToggled.emit).not.toHaveBeenCalled();
      expect(component.generateLinkCssClasses).not.toHaveBeenCalled();
    });

    it('should call generateLinkCssClasses() and emit an expansion event', () => {
      component.children = [{ title: 'title' }];
      component.toggleExpansion();
      const expectedItem: NavItem = component.generateNavItemObject();
      expect(component.expansionToggled.emit).toHaveBeenCalledWith(expectedItem);
      expect(component.generateLinkCssClasses).toHaveBeenCalled();
    });
  });

  describe('generateLinkCssClasses()', () => {
    let expectedResult: string[];

    beforeEach(() => {
      component.children = undefined;
      component.isExpanded = undefined;
      component.isDisabled = undefined;
      expectedResult = [];
    });

    it('should include just the base class by default', () => {
      expectedResult = [
        'f-navItem__link',
      ];
      component.generateLinkCssClasses();
      expect(component.linkCssClasses).toEqual(expectedResult);
    });

    it('should append "expandable" if the nav item has children', () => {
      component.children = null;
      expectedResult = [
        'f-navItem__link',
      ];
      component.generateLinkCssClasses();
      expect(component.linkCssClasses).toEqual(expectedResult);

      component.children = [];
      expectedResult = [
        'f-navItem__link',
      ];
      component.generateLinkCssClasses();
      expect(component.linkCssClasses).toEqual(expectedResult);

      component.children = [{}];
      expectedResult = [
        'f-navItem__link',
        'f-navItem__link--expandable',
      ];
      component.generateLinkCssClasses();
      expect(component.linkCssClasses).toEqual(expectedResult);
    });

    it('should append "expanded" if the nav item is expanded', () => {
      component.isExpanded = false;
      expectedResult = [
        'f-navItem__link',
      ];
      component.generateLinkCssClasses();
      expect(component.linkCssClasses).toEqual(expectedResult);

      component.isExpanded = true;
      expectedResult = [
        'f-navItem__link',
        'f-navItem__link--expanded',
      ];
      component.generateLinkCssClasses();
      expect(component.linkCssClasses).toEqual(expectedResult);
    });

    it('should append "expanded" if the nav item is expanded', () => {
      component.isDisabled = false;
      expectedResult = [
        'f-navItem__link',
      ];
      component.generateLinkCssClasses();
      expect(component.linkCssClasses).toEqual(expectedResult);

      component.isDisabled = true;
      expectedResult = [
        'f-navItem__link',
        'f-navItem__link--disabled',
      ];
      component.generateLinkCssClasses();
      expect(component.linkCssClasses).toEqual(expectedResult);
    });
  });

  describe('generateIconCssClasses()', () => {
    it('should generate with the base class', () => {
      component.icon = undefined;
      component.generateIconCssClasses();
      expect(component.iconCssClasses).toEqual(['f-navItem__icon']);
    });

    it('shoudl append the custom icon classes', () => {
      component.icon = 'icon-class';
      component.generateIconCssClasses();
      expect(component.iconCssClasses).toEqual(['f-navItem__icon', 'icon-class']);

      component.icon = 'mdi-chevron-down';
      component.generateIconCssClasses();
      expect(component.iconCssClasses).toEqual(['f-navItem__icon', 'mdi', 'mdi-chevron-down']);
    });
  });

  describe('generateNavItemObject()', () => {
    it('should generate a nav item object', () => {
      component.id = 'id';
      component.title = 'title';
      component.text = 'text';
      component.icon = 'icon';
      component.isExpanded = true;
      component.isDisabled = false;
      component.href = 'href';
      component.route = 'route';
      component.children = [];
      component.index = 0;
      const expectedObject: NavItem = {
        id: 'id',
        title: 'title',
        text: 'text',
        icon: 'icon',
        isExpanded: true,
        isDisabled: false,
        href: 'href',
        route: 'route',
        children: [],
        index: 0.
      };
      expect(component.generateNavItemObject()).toEqual(expectedObject);
    });
  });

  describe('setCurrentSelectedNavItem()', () => {
    it('should emit the selected nav item', () => {
      spyOn(component.itemSelected, 'emit').and.stub();
      let expectedItem: NavItem = { title: 'nav-item' };
      component.setCurrentSelectedNavItem(expectedItem);
      expect(component.itemSelected.emit).toHaveBeenCalledWith(expectedItem);

      component.title = 'nav-title';
      expectedItem = component.generateNavItemObject();
      component.setCurrentSelectedNavItem();
      expect(component.itemSelected.emit).toHaveBeenCalledWith(expectedItem);
    });
  });

  describe('generateNavItemId()', () => {
    it('should return a generated nav item id', () => {
      expect(component.generateNavItemId().includes('nav-item-')).toBeTruthy();
    });
  });
});
