import { DocumentClickService } from './document-click.service';

describe('DocumentClickService', () => {
  let documentStub: Document;
  let service: DocumentClickService;

  beforeEach(() => {
    documentStub = document;
    service = new DocumentClickService(documentStub);
  });

  describe('construction', () => {
    it('should create a subscription that listens for when the document is clicked', (done: DoneFn) => {
      spyOn(service.documentClickedTarget$, 'next').and.callThrough();
      expect(service).toBeDefined();

      const button: HTMLButtonElement = documentStub.createElement('button');
      const body: HTMLElement = documentStub.getElementsByTagName('body')[0];
      body.appendChild(button);

      service.documentClickedTarget$.subscribe((element: HTMLElement) => {
        expect(element).toEqual(button);
        expect(service.documentClickedTarget$.next).toHaveBeenCalled();
        done();
      });

      button.click();
    });
  });
});
