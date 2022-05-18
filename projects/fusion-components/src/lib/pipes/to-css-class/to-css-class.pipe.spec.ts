import { ToCssClassPipe } from './to-css-class.pipe';

describe('ToClassPipe', () => {
  const pipe = new ToCssClassPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the string to a css class format', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform('HELLO')).toBe('hello');
    expect(pipe.transform('-hyphen')).toBe('hyphen');
    expect(pipe.transform('MyNameIsJacob')).toBe('my-name-is-jacob');
    expect(pipe.transform('myNameIsSally')).toBe('my-name-is-sally');
    expect(pipe.transform('myNameIsJamie_andTim')).toBe('my-name-is-jamie-and-tim');
    expect(pipe.transform('myNameIsCourtney and Agatha')).toBe('my-name-is-courtney-and-agatha');
    expect(pipe.transform('myNameIsDrake-andNoah')).toBe('my-name-is-drake-and-noah');
    expect(pipe.transform('my name is billy')).toBe('my-name-is-billy');
    expect(pipe.transform('my name is Kate')).toBe('my-name-is-kate');
    expect(pipe.transform('my_name_is_tom')).toBe('my-name-is-tom');
    expect(pipe.transform('101010')).toBe('101010');
  });
});
