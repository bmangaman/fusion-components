import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FusionComponentsComponent } from './fusion-components.component';

describe('FusionComponentsComponent', () => {
  let component: FusionComponentsComponent;
  let fixture: ComponentFixture<FusionComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FusionComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FusionComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
