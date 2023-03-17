interface Upload extends MongooseBaseModel<null> {
  fileName: string;
  originalFileName: string;
  extension: string;
  folder?: string | undefined;
  fullPath: string;
  size: number;
  url: string;
}
