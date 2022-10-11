import { UploadInfo } from '../../upload.interface';
import { UploadFileNamePipe } from './upload-file-name.pipe';

describe('UploadFileNamePipe', () => {
  let pipe: UploadFileNamePipe;

  beforeEach(() => {
    pipe = new UploadFileNamePipe();
  });

  describe('transform()', () => {
    it('should return the name(s) of the provided file(s)', () => {
      const fileInfo: UploadInfo = {} as UploadInfo;
      const files: File[] = [];

      files.push(
        { name: 'name1'} as File,
        { name: 'name2'} as File,
        { name: 'name3'} as File,
      );

      expect(pipe.transform(null as any)).toEqual('');
      expect(pipe.transform(fileInfo)).toEqual('');

      fileInfo.files = [files[0]];
      expect(pipe.transform(fileInfo)).toEqual('name1');

      fileInfo.files = files;
      expect(pipe.transform(fileInfo)).toEqual('name1, name2, name3');
    });
  });

});
