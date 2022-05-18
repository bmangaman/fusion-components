import { ViewContainerRef } from '@angular/core';

import { ComponentStubFactory } from '@fusion-ui/fusion-components/unit-test-helpers/component-stub-factory.spec';

import { TableFilterHostDirective } from './table-filter-host.directive';

describe('TableFilterHostDirective', () => {
  let component: TableFilterHostDirective;
  let viewContainerRef: ViewContainerRef;

  beforeEach(() => {
    viewContainerRef = ComponentStubFactory.getViewContainerRefStub() as ViewContainerRef;
    component = new TableFilterHostDirective(viewContainerRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
