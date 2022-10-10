import { Observable, of } from 'rxjs';

import { InstanceOfPipe } from './instance-of.pipe';

describe('InstanceOfPipe', () => {
  const pipe = new InstanceOfPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true if the provided variable is the correct instance', () => {
    class C { constructor() {} }
    class D {}

    expect(pipe.transform(new C(), C)).toBeTrue();
    expect(pipe.transform(new D(), D)).toBeTrue();
    expect(pipe.transform(of(null), Observable)).toBeTrue();

    expect(pipe.transform(new C(), D)).toBeFalse();
    expect(pipe.transform(new D(), C)).toBeFalse();
    expect(pipe.transform(new Promise(() => {}), Observable)).toBeFalse();
  });

});
