import { FusionComponentsTranslationService } from '@fusion-components/lib/services';
import { TableFilterComparatorComponent } from './table-filter-comparator.component';
import { FilterComparator } from './table-filter-comparator.interface';

describe('TableFilterComparatorComponent', () => {
  let component: TableFilterComparatorComponent;
  let translationService: FusionComponentsTranslationService;

  beforeEach(() => {
    translationService = new FusionComponentsTranslationService();
    component = new TableFilterComparatorComponent(translationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs', () => {
    describe('comparators', () => {
      it('should only set the comparators to the provided value if it is defined', () => {
        const existingComparators: FilterComparator[] = [{} as FilterComparator, {} as FilterComparator];
        const newComparators: FilterComparator[] = [{} as FilterComparator];

        // eslint-disable-next-line @typescript-eslint/dot-notation
        component['_comparators'] = existingComparators;

        component.comparators = undefined;
        expect(component.comparators).toEqual(existingComparators);

        component.comparators = newComparators;
        expect(component.comparators).toEqual(newComparators);
      });

      it('should set the selectedComparator to the first one by default', () => {
        spyOn(component.comparatorChange, 'emit').and.stub();

        let newComparators: FilterComparator[] = [];
        component.comparators = newComparators;
        expect(component.comparatorChange.emit).not.toHaveBeenCalled();

        newComparators = [{} as FilterComparator];
        component.comparators = newComparators;
        expect(component.selectedComparator.value).toEqual(newComparators[0]);
        expect(component.comparatorChange.emit).toHaveBeenCalled();
      });
    });
  });

  describe('ngOnInit()', () => {
    it('should subscribe to when the selected comparator changes and emits when it does change', () => {
      spyOn(component.comparatorChange, 'emit').and.stub();
      component.ngOnInit();
      component.selectedComparator.setValue({} as FilterComparator);
      expect(component.comparatorChange.emit).toHaveBeenCalled();
    });
  });
});
