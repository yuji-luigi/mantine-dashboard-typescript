export interface MixedMediaType {
  [key: string]: Array<Upload | File>;
}
export interface UploadingMediaType {
  [key: string]: File[];
}
