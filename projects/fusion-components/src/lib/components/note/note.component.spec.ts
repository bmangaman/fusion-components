import { NoteComponent } from './note.component';

describe('NoteComponent', () => {
  let component: NoteComponent;

  beforeEach(() => {
    component = new NoteComponent();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
