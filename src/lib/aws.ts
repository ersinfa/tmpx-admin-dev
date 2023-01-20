import ReactS3Client from 'react-aws-s3-typescript';

const s3Config = {
  bucketName: 'tmpx-bucket',
  dirName: 'app',
  region: 'us-west-1',
  accessKeyId: 'AKIAQXRT2HLLFS57RNM3',
  secretAccessKey: '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',
  s3Url: 'https://tmpx-bucket.s3.us-west-1.amazonaws.com',
};

export const uploadFile = async (file: File, filename?: string) => {
  /* Import s3 config object and call the constrcutor */
  const s3 = new ReactS3Client(s3Config);

  /* You can use the default directory defined in s3Config object
   * Or you can a define custom directory to upload when calling the
   * constructor using js/ts object destructuring.
   *
   * const s3 = new ReactS3Client({
   *      ...s3Config,
   *      dirName: 'custom-directory'
   * });
   *
   */

  /* If you do not specify a file name, file will be uploaded using uuid generated
   * by short-UUID (https://www.npmjs.com/package/short-uuid)
   */

  try {
    const name = file.name.split('.')[0];
    const res = await s3.uploadFile(file, name);

    console.log(res);

    return res;
    /*
     * {
     *   Response: {
     *     bucket: "bucket-name",
     *     key: "directory-name/filename-to-be-uploaded",
     *     location: "https:/your-aws-s3-bucket-url/directory-name/filename-to-be-uploaded"
     *   }
     * }
     */
  } catch (exception) {
    console.log(exception);
    /* handle the exception */
  }
};

export const listFiles = async () => {
  /* Import s3 config object and call the constrcutor */
  const s3 = new ReactS3Client(s3Config);

  try {
    const fileList = await s3.listFiles();

    console.log(fileList);

    return fileList.data.Contents;
    /*
     * {
     *   Response: {
     *     message: "Objects listed succesfully",
     *     data: {                   // List of Objects
     *       ...                     // Meta data
     *       Contents: []            // Array of objects in the bucket
     *     }
     *   }
     * }
     */
  } catch (exception) {
    console.log(exception);
    /* handle the exception */
  }
};

export const deleteFile = async () => {
  /* Import s3 config object and call the constrcutor */
  const s3 = new ReactS3Client(s3Config);

  /* Define the filepath from the root of the bucket to the file to be deleted */
  const filepath = 'directory-name/filename-to-be-deleted';

  try {
    await s3.deleteFile(filepath);

    console.log('File deleted');
  } catch (exception) {
    console.log(exception);
    /* handle the exception */
  }
};
