export interface MixedMediaType {
  [key: string]: Array<UploadModel | File>;
}
export interface UploadingMediaType {
  [key: string]: File[];
}
