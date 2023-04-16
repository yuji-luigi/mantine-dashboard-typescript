interface UploadModel {
  _id: string;
  name: string;
  fileName: string;
  originalFileName: string;
  extension: string;
  folder?: string | undefined;
  fieldName: string;
  fullPath: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}
