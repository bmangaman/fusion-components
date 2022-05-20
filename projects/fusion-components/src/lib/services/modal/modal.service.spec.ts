import { Component } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';

import {
  ActiveModal,
  BaseModalComponent,
  DomService,
  ModalComponent,
  ModalService,
  ModalType,
} from '@fusion-components';
import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';
import { Subject } from 'rxjs';
import Spy = jasmine.Spy;

@Component({
  selector: 'f-modal-service-test',
  template: ''
})
export class ModalServiceTestComponent extends BaseModalComponent {
  constructor() {
    super();
  }
}

describe('ModalService', () => {
  let service: ModalService;
  let domService: DomService;
  let emitSubject: Subject<any>;

  beforeEach(() => {
    emitSubject = new Subject<any>();
    const baseMockComponentRef = {
      changeDetectorRef: ComponentStubFactory.getChangeDetectorRefStub(),
      location: {
        nativeElement: {}
      },
      destroy: jasmine.createSpy('destroy')
    };
    domService = {
      attachComponent: jasmine.createSpy('attachComponent').and.returnValue(null),
      createComponent: jasmine.createSpy('createComponent'),
      removeComponent: jasmine.createSpy('removeComponent').and.returnValue(null),
    } as any as DomService;

    (domService.createComponent as Spy).withArgs(ModalServiceTestComponent, undefined).and.returnValue({
      ...baseMockComponentRef,
      instance: {
        modalClosed: emitSubject
      }
    });

    (domService.createComponent as Spy).withArgs(ModalComponent, jasmine.anything(), jasmine.anything()).and.returnValue({
      ...baseMockComponentRef,
      instance: {
        init: jasmine.createSpy('init'),
        changeState: jasmine.createSpy('changeState'),
        setContainerOverflow: jasmine.createSpy('setContainerOverflow'),
      }
    });
    service = new ModalService(domService);
  });

  describe('openModal()', () => {
    it('should create an id if one is not provided', () => {
      service.openModal({
        component: ModalServiceTestComponent,
      });

      expect(service.modals[0].id).toEqual(jasmine.any(String));
    });

    it('should not create an id if one is provided', () => {
      service.openModal({
        id: 'my id',
        component: ModalServiceTestComponent,
      });

      expect(service.modals[0].id).toBe('my id');
    });

    it('should use the modalConfig provided', () => {
      service.openModal({
        modalConfig: {
          type: ModalType.SIDE,
        },
        component: ModalServiceTestComponent,
      });

      expect(service.modals[0].modalConfig.type).toBe(ModalType.SIDE);
    });

    it('should create 2 components and attach the modal to the dom', () => {
      service.openModal({
        component: ModalServiceTestComponent,
      });

      expect(domService.createComponent).toHaveBeenCalledTimes(2);
      expect(domService.createComponent).toHaveBeenCalledWith(ModalServiceTestComponent, undefined);
      expect(domService.createComponent).toHaveBeenCalledWith(ModalComponent, jasmine.any(Object), jasmine.anything());
    });

    it('should subscribe to modalClosed', fakeAsync(() => {
      spyOn(service, 'closeModal');
      service.openModal({
        component: ModalServiceTestComponent,
      }).subscribe();

      emitSubject.next(true);
      tick(1000);

      expect(service.closeModal).toHaveBeenCalled();
    }));

    it('should add offset width if there are other FULL modals', () => {
      (service as any)._modals = [
        {
          modalConfig: {
            type: ModalType.FULL, addOffSetWidth: null,
          }
        }];

      service.openModal({
        component: ModalServiceTestComponent,
        modalConfig: {
          type: ModalType.FULL,
        }
      });

      expect(service.modals[1].modalConfig.addOffSetWidth).toBe('40px');
    });

    it('should not add offset width if there are other non-FULL modals', () => {
      (service as any)._modals = [
        {
          modalConfig: {
            type: ModalType.SIDE, addOffSetWidth: null,
          }
        }];

      service.openModal({
        component: ModalServiceTestComponent,
        modalConfig: {
          type: ModalType.FULL,
        }
      });

      expect(service.modals[1].modalConfig.addOffSetWidth).toBe(undefined);
    });
  });

  describe('closeModal()', () => {
    let contentComponentRef;
    let componentRef;

    beforeEach(() => {
      contentComponentRef = { destroy: jasmine.createSpy('destroy') };
      componentRef = { destroy: jasmine.createSpy('destroy') };

      (service as any)._modals = [
        {
          id: 'a',
          modalConfig: {
            type: ModalType.SIDE, addOffSetWidth: null,
          },
          componentRef,
          contentComponentRef,
        }];
    });

    it('should do nothing if no modal can be found with a given ID', () => {
      service.closeModal('b');

      expect(domService.removeComponent).not.toHaveBeenCalled();
      expect(service.modals.length).toBe(1);
    });

    it('should remove the modal and destroy the components', () => {
      service.closeModal('a');

      expect(domService.removeComponent).toHaveBeenCalled();
      expect(service.modals.length).toBe(0);
      expect(contentComponentRef.destroy).toHaveBeenCalled();
      expect(componentRef.destroy).toHaveBeenCalled();
    });
  });

  it('should close all modals', () => {
    const componentRefStub = jasmine.createSpyObj('ComponentRef', ['destroy']);
    const contentComponentRefStub = jasmine.createSpyObj('ContentComponentRef', ['destroy']);
    const toClose: ActiveModal<any>[] = [
      { id: 666, componentRef: componentRefStub, contentComponentRef: contentComponentRefStub } as unknown as ActiveModal<any>,
      { id: 999, componentRef: componentRefStub, contentComponentRef: contentComponentRefStub } as unknown as ActiveModal<any>
    ];
    (service as any)._modals = toClose;

    spyOn(service, 'closeModal').and.callThrough();

    service.closeAllModals();

    expect(service.modals.length).toEqual(0);
    expect(service.closeModal).toHaveBeenCalledTimes(2);
    expect(domService.removeComponent).toHaveBeenCalledTimes(2);
    expect(contentComponentRefStub.destroy).toHaveBeenCalledTimes(2);
    expect(componentRefStub.destroy).toHaveBeenCalledTimes(2);
  });
});
