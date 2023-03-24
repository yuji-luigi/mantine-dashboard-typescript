interface UseFormReturnTypeWithMedia {
  values: {
    media?: {
      [key: string]: File[] | Upload[];
    };
    mediaPreview?: {
      [key: string]: string[];
    };
  };
}
