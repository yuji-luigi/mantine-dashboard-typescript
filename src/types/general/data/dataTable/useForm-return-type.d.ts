interface UseFormReturnTypeWithMedia {
  values: {
    media?: {
      [key: string]: File[] | UploadModel[];
    };
    // mediaPreview?: {
    //   [key: string]: string[];
    // };
  };
}
