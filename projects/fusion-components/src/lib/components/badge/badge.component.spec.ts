import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;

  beforeEach(() => {
    component = new BadgeComponent();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('@HostBinding', () => {
    describe('get cssClasses', () => {
      it('should return the CSS classes to appended to the host element based on the fillContainer flag', () => {
        const wrapper = 'f-badge__wrapper';

        component.hostCssClasses = [];

        component.fillContainer = false;
        expect(component.cssClasses).toEqual(wrapper);

        component.fillContainer = true;
        expect(component.cssClasses).toEqual(`${wrapper} ${wrapper}--fill-container`);
      });

      it('should return the CSS classes to append the host element based on if any custom host classes were provided', () => {
        const wrapper = 'f-badge__wrapper';
        const hostCssClasses = ['custom1', 'custom2'];

        component.fillContainer = false;

        component.hostCssClasses = hostCssClasses;
        expect(component.cssClasses).toEqual(`${wrapper} ${hostCssClasses[0]} ${hostCssClasses[1]}`);
      });
    });
  });
});
