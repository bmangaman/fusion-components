import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Event, NavigationEnd, Router, RoutesRecognized } from '@angular/router';

import { filter, map, tap } from 'rxjs/operators';

import { NavItem } from '@fusion-components/lib/components/sidenav/sidenav.interface';

@Component({
  selector: 'fusion-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  rootRoute: string;

  readonly navItems: NavItem[] = [
    {
      text: 'Components',
      icon: 'mdi mdi-puzzle',
      children: [
        {
          text: 'Accordion',
          route: 'components/accordion',
        },
        {
          text: 'Badge',
          route: 'components/badge',
        },
        {
          text: 'Button',
          route: 'components/button',
        },
        {
          text: 'Card',
          route: 'components/card',
        },
        {
          text: 'Checkbox',
          route: 'components/checkbox',
        },
        {
          text: 'Error Message',
          route: 'components/error-message',
        },
        {
          text: 'Key Value Table',
          route: 'components/key-value-table',
        },
        {
          text: 'Linear Gauge',
          route: 'components/linear-gauge',
        },
        {
          text: 'Loading Spinner',
          route: 'components/loading-spinner',
        },
        {
          text: 'Menu',
          route: 'components/menu',
        },
        {
          text: 'Modal',
          route: 'components/modal',
        },
        {
          text: 'Note',
          route: 'components/note',
        },
        {
          text: 'Notification',
          route: 'components/notification',
        },
        {
          text: 'Progress Bar',
          route: 'components/progress-bar',
        },
        {
          text: 'Select',
          route: 'components/select',
        },
        {
          text: 'Sidenav',
          route: 'components/sidenav',
        },
        {
          text: 'Table',
          route: 'components/table',
        },
        {
          text: 'Tabview',
          route: 'components/tabview',
        },
        {
          text: 'Tooltip',
          route: 'components/tooltip',
        },
        {
          text: 'Upload',
          route: 'components/upload',
        },
        {
          text: 'Widget',
          route: 'components/widget',
        },
        {
          text: 'Wizard',
          route: 'components/wizard',
        },
      ],
    },
    {
      text: 'Patterns',
      icon: 'mdi mdi-repeat',
      children: [
        {
          text: 'Forms',
          route: 'patterns/forms',
        },
        {
          text: 'Tokens',
          route: 'patterns/tokens',
        },
        {
          text: 'Typography',
          route: 'patterns/typography',
        },
      ],
    },
    {
      text: 'Directives',
      icon: 'mdi mdi-chart-bubble',
      children: [
        {
          text: 'Download',
          route: 'directives/download',
        },
        {
          text: 'Password Visibility Toggle',
          route: 'directives/password-visibility-toggle',
        },
        {
          text: 'State',
          route: 'directives/state',
        },
      ],
    },
    {
      text: 'Pipes',
      route: '/pipes',
      icon: 'mdi mdi-pipe'
    },
  ];

  @HostBinding('class.embedded') isEmbeddedView = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.findRootRoute();
  }

  ngOnInit(): void {
    this.handleEmbeds();
  }

  itemSelected(item: NavItem): void {
    console.log('selected nav item', item);
  }

  findRootRoute(): void {
    this.router.events.pipe(
      map((data: Data) => !!data && data instanceof RoutesRecognized ? data.url.split('/') : [])
    ).subscribe((segments: string[]) => {
      this.rootRoute = segments.find((segment: string) => segment.includes('$')) || '';
    });
  }

  /**
   * Hides unnecessary elements when the route is in "embedded" mode.
   */
  handleEmbeds(): void {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        tap(() => this.isEmbeddedView = 'embedded' in this.route.snapshot.queryParams),
      ).subscribe();
  }
}
