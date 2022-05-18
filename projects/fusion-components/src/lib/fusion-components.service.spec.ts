import { TestBed } from '@angular/core/testing';

import { FusionComponentsService } from './fusion-components.service';

describe('FusionComponentsService', () => {
  let service: FusionComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FusionComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
