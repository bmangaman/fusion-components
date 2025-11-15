import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NoteComponentPageObject } from './note.component.spec.po';
import { NoteModule } from './note.module';

@Component({
    selector: 'f-test-component',
    template: `
    <f-note>
      <div class="projected-content">Projected Text</div>
    </f-note>
  `,
    standalone: false
})
export class NoteTestComponent {}

describe('NoteComponent', () => {
  let component: NoteTestComponent;
  let fixture: ComponentFixture<NoteTestComponent>;
  let page: NoteComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoteTestComponent,
      ],
      imports: [
        NoteModule,
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(NoteTestComponent);
    component = fixture.componentInstance;
    page = new NoteComponentPageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(page.note).toBeTruthy();
  });

  it('should display the projected content', () => {
    expect(page.note.note?.innerHTML).toContain('<div class="projected-content">Projected Text</div>');
  });
});
