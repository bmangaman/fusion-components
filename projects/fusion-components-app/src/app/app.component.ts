import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Event, NavigationEnd, NavigationError, Router, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { filter, map, tap } from 'rxjs/operators';

import { FusionComponentsTranslationService } from '@fusion-components';
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
    {
      text: 'Documentation',
      icon: 'mdi mdi-file-document',
      href: './doc/index.html',
      target: '_blank',
    },
  ];

  @HostBinding('class.embedded') isEmbeddedView = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private translationService: FusionComponentsTranslationService,
  ) {
    this.findRootRoute();
    this.setTranslation();
    this.translationService.baseTranslationKey = 'components';
  }

  ngOnInit(): void {
    this.handleEmbeds();
    this.handleRedirects();
  }

  setTranslation(): void {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.addLangs([ 'en' ]);
    this.translate.setDefaultLang('en');
    const browserLang: string = this.translate.getBrowserLang() || 'en';

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(this.translate.getLangs().includes(browserLang) ? browserLang : this.translate.getDefaultLang());
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

  /**
   * Handles rogue links from within the generated documentation.
   */
  handleRedirects(): void {
    const redirectMap: Record<string, string> = {
      '/wiki/FUSION-COMPONENTS.md': '/doc/additional-documentation/fusion-components-wiki.html'
    };

    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationError),
        tap((event: NavigationError) => {
          const redirect: string | undefined = redirectMap[event.url];
          if (redirect) {
            location.href = redirect;
          }
        })
      ).subscribe();
  }
}
