import { BytesPipeBase } from './bytes.interface';
import { BytesPipe } from './bytes.pipe';

describe('BytesToSizePipe', () => {
  let pipe: BytesPipe;

  beforeEach(() => {
    pipe = new BytesPipe();
  });

  it('should return "-" if the provided value is undefined', () => {
    expect(pipe.transform(undefined)).toBe('-');
    expect(pipe.transform(null)).toBe('-');
  });

  it('should return "0 B" or 0 if a value of 0 is provided', () => {
    expect(pipe.transform(0)).toBe('0 B');
    expect(pipe.transform(0, BytesPipeBase.TWO, false)).toBe(0);
  });

  it('should return just the converted value if includeUnit is false', () => {
    expect(pipe.transform(1, BytesPipeBase.TWO, false)).toBe(1);
    expect(pipe.transform(1024, BytesPipeBase.TWO, false)).toBe(1);

    expect(pipe.transform(999, BytesPipeBase.TEN, false)).toBe(999);
    expect(pipe.transform(1000, BytesPipeBase.TEN, false)).toBe(1);
  });

  it('should allow you to control the precision', () => {
    expect(pipe.transform(1500, BytesPipeBase.TWO, true, 0)).toBe('1 KiB');
    expect(pipe.transform(1000 * 1000 - 100, BytesPipeBase.TWO, true, 0)).toBe('976 KiB');
    expect(pipe.transform(1000 * 1000 - 100, BytesPipeBase.TWO, true, 1)).toBe('976.5 KiB');
    expect(pipe.transform(1000 * 1000 - 100, BytesPipeBase.TWO, true, 3)).toBe('976.465 KiB');
  });

  describe('biBytes (KiB, MiB, GiB, etc.)', () => {
    it('should be able to convert the provided value to bytes', () => {
      expect(pipe.transform(1)).toEqual('1 B');
      expect(pipe.transform(999)).toEqual('999 B');
    });

    it('should convert the provided value to KiB if the value (in bytes) > 1024', () => {
      const baseValue = 1024;

      expect(pipe.transform(baseValue)).toBe('1 KiB');
      expect(pipe.transform(baseValue * 1023)).toBe('1023 KiB');
      expect(pipe.transform(baseValue * 1023.99)).toBe('1023.99 KiB');
    });

    it(`should convert the provided value to MiB if value (in bytes) >= ${Math.pow(1024, 2)}`, () => {
      const baseValue: number = Math.pow(1024, 2);

      expect(pipe.transform(baseValue)).toBe('1 MiB');
      expect(pipe.transform(baseValue * 1023)).toBe('1023 MiB');
      expect(pipe.transform(baseValue * 1023.99)).toBe('1023.99 MiB');
    });

    it(`should convert the provided value to GiB if value (in bytes) >= ${Math.pow(1024, 3)}`, () => {
      const baseValue: number = Math.pow(1024, 3);

      expect(pipe.transform(baseValue)).toBe('1 GiB');
      expect(pipe.transform(baseValue * 1023)).toBe('1023 GiB');
      expect(pipe.transform(baseValue * 1023.99)).toBe('1023.99 GiB');
    });

    it(`should convert the provided value to TiB if value (in bytes) >= ${Math.pow(1024, 4)}`, () => {
      const baseValue: number = Math.pow(1024, 4);

      expect(pipe.transform(baseValue)).toBe('1 TiB');
      expect(pipe.transform(baseValue * 1023)).toBe('1023 TiB');
      expect(pipe.transform(baseValue * 1023.99)).toBe('1023.99 TiB');
    });

    it(`should convert the provided value to PiB if value (in bytes) >= ${Math.pow(1024, 5)}`, () => {
      const baseValue: number = Math.pow(1024, 5);

      expect(pipe.transform(baseValue)).toBe('1 PiB');
      expect(pipe.transform(baseValue * 1023)).toBe('1023 PiB');
      expect(pipe.transform(baseValue * 1023.99)).toBe('1023.99 PiB');
    });
  });

  describe('bytes (KB, MB, GB, etc.)', () => {
    let base: BytesPipeBase;

    beforeAll(() => {
      base = BytesPipeBase.TEN;
    });

    it('should be able to convert the provided value to bytes', () => {
      expect(pipe.transform(1, base)).toEqual('1 B');
      expect(pipe.transform(999, base)).toEqual('999 B');
    });

    it('should convert the provided value to KB if the value (in bytes) > 1000', () => {
      const baseValue = 1000;

      expect(pipe.transform(baseValue, base)).toBe('1 KB');
      expect(pipe.transform(baseValue * 999, base)).toBe('999 KB');
      expect(pipe.transform(baseValue * 1000 - 100, base)).toBe('999.9 KB');
    });

    it(`should convert the provided value to MB if value (in bytes) >= ${Math.pow(1000, 2)}`, () => {
      const baseValue: number = Math.pow(1000, 2);

      expect(pipe.transform(baseValue, base)).toBe('1 MB');
      expect(pipe.transform(baseValue * 999, base)).toBe('999 MB');
      expect(pipe.transform(baseValue * 1000 - 10000, base)).toBe('999.99 MB');
    });

    it(`should convert the provided value to GB if the value (in bytes) >= ${Math.pow(1000, 3)}`, () => {
      const baseValue: number = Math.pow(1000, 3);

      expect(pipe.transform(baseValue, base)).toBe('1 GB');
      expect(pipe.transform(baseValue * 999, base)).toBe('999 GB');
      expect(pipe.transform(baseValue * 1000 - 10000000, base)).toBe('999.99 GB');
      expect(pipe.transform(baseValue * 1.2, base)).toBe('1.2 GB');
    });

    it(`should convert the provided value to TB if the value (in bytes) >= ${Math.pow(1000, 4)}`, () => {
      const baseValue: number = Math.pow(1000, 4);

      expect(pipe.transform(baseValue, base)).toBe('1 TB');
      expect(pipe.transform(baseValue * 999, base)).toBe('999 TB');
      expect(pipe.transform(baseValue * 1000 - 10000000000, base)).toBe('999.99 TB');
      expect(pipe.transform(baseValue * 1.2, base)).toBe('1.2 TB');
    });

    it(`should convert the provided value to PB if the value (in bytes) >= ${Math.pow(1000, 5)}`, () => {
      const baseValue: number = Math.pow(1000, 5);

      expect(pipe.transform(baseValue, base)).toBe('1 PB');
      expect(pipe.transform(baseValue * 999, base)).toBe('999 PB');
      expect(pipe.transform(baseValue * 1000 - 10000000000000, base)).toBe('999.99 PB');
      expect(pipe.transform(baseValue * 1.2, base)).toBe('1.2 PB');
    });
  });
});
