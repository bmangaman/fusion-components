import { ModalHeaderComponent } from './modal-header.component';

describe('ModalHeaderComponent', () => {
  let component: ModalHeaderComponent;

  beforeEach(() => {
    component = new ModalHeaderComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('close()', () => {
    it('should emit an event to close the modal', () => {
      spyOn(component.modalClosed, 'emit');
      component.close();
      expect(component.modalClosed.emit).toHaveBeenCalled();
    });
  });

  describe('hostClasses', () => {
    it('should return the right classes based on type', () => {
      component.isFullModal = false;
      expect(component.hostClasses).toBe('fusion-ui-modal__header');

      component.isFullModal = true;
      expect(component.hostClasses).toBe('fusion-ui-modal__full-header');
    });
  });
});
