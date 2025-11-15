import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { of } from 'rxjs';

import { NavItem } from '@fusion-components/lib/components/sidenav/sidenav.interface';

@Component({
    selector: 'fusion-demo-sidenav',
    templateUrl: './sidenav-demo.component.html',
    styleUrls: ['./sidenav-demo.component.scss'],
    standalone: false
})
export class SidenavDemoComponent {
  sidenavForm: UntypedFormGroup;
  navItems: NavItem[];

  constructor(
    private fb: UntypedFormBuilder,
  ) {
    this.buildSidenavForm();
    this.buildNavItems();
  }

  buildSidenavForm(): void {
    this.sidenavForm = this.fb.group({})
  }

  buildNavItems(): void {
    this.navItems = [
      {
        id: 'no-children-id',
        route: 'no-children-link',
        text: 'no children'
      },
      {
        id: 'has-children-id',
        text: 'has children',
        children: [
          {
            id: 'child-1',
            route: 'child-1',
            text: of('child-1'),
          },
          {
            id: 'child-2',
            route: 'child-2',
            text: 'child-2',
          },
          {
            id: 'child-3-has-children',
            route: 'child-3-has-children',
            text: 'child-3-has-children',
            children: [
              {
                id: 'child-3-child-1',
                route: 'child-3-child-1',
                text: of('child-3-child-2'),
              },
              {
                id: 'child-3-child-2',
                route: 'child-3-child-2',
                text: 'child-3-child-2',
              },
            ]
          },
        ],
      },
    ];
  }
}
