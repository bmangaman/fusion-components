import { PercentPipe } from '@angular/common';

import { ToCssClassPipe } from '../to-css-class';
import { PipeItem } from './meta.interface';
import { MetaPipe } from './meta.pipe';


describe('MetaPipe', () => {
  const pipe = new MetaPipe();

  let pipeItems: PipeItem[];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original value if no (valid) pipes were provided', () => {
    pipeItems = undefined as any;
    expect(pipe.transform('HelloWorld', pipeItems)).toBe('HelloWorld');

    pipeItems = [];
    expect(pipe.transform('HelloWorld', pipeItems)).toBe('HelloWorld');

    pipeItems = [null as any];
    expect(pipe.transform('HelloWorld', pipeItems)).toBe('HelloWorld');
  });

  it('should use the provided pipes to transform the provided value', () => {
    // plain string
    pipeItems = [
      {
        pipe: new ToCssClassPipe(),
      },
    ];
    expect(pipe.transform('HelloWorld', pipeItems)).toBe('hello-world');

    // plain number
    pipeItems = [
      {
        pipe: new PercentPipe('en-US'),
      },
    ];
    expect(pipe.transform(0.5, pipeItems)).toBe('50%');

    // number w/ additional values
    pipeItems = [
      {
        pipe: new PercentPipe('en-US'),
        values: ['1.2-4']
      },
    ];
    expect(pipe.transform(0.545, pipeItems)).toBe('54.50%');
  });
});
