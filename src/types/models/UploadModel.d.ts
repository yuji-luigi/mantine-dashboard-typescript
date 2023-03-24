interface Upload {
  _id: string;
  name: string;
  fileName: string;
  originalFileName: string;
  extension: string;
  folder?: string | undefined;
  fullPath: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}
