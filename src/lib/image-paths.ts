import { getPsuedoID, getRandomNumber, getRandomNumberOne } from '../utils/helper-functions';

export const PATH_IMAGE = {
  rootSpaceCard1: '/images/haussmann-buildings3.png',
  flatmateLogo1: '/images/flatmate_circle_logo_yellow.png',
  faviconsvg: '/favicon.svg',
  FILES: {
    pdf: '/file_images/pdf.png',
    pdf1: '/file_images/pdf_1.png',
    pdf2: '/file_images/pdf_2.png',
    doc: '/file_images/doc.png',
    image: '/file_images/image.png',
    jpg: '/file_images/jpg.png',
    png: '/file_images/png.png',
    txt: '/file_images/txt-file.png',
    xls: '/file_images/xls.png',
  },
};

const a = getRandomNumberOne;

export const RANDOM_UPLOAD_MODELS: UploadModel[] = [
  {
    _id: getPsuedoID().toString(),
    url: `https://picsum.photos/41${a()}/30${a()}`,
    name: 'image1.jpg',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    extension: 'jpg',
    size: getRandomNumber(),
    fieldName: 'image',
    fileName: 'image1.jpg',
    fullPath: `https://picsum.photos/41${a()}/30${a()}`,
    originalFileName: 'image1.jpg',
    folder: 'image',
  },
  {
    _id: getPsuedoID().toString(),
    url: `https://picsum.photos/41${a()}/30${a()}`,
    name: 'image1.jpg',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    extension: 'jpg',
    size: getRandomNumber(),
    fieldName: 'image',
    fileName: 'image1.jpg',
    fullPath: `https://picsum.photos/41${a()}/30${a()}`,
    originalFileName: 'image1.jpg',
    folder: 'image',
  },
  {
    _id: getPsuedoID().toString(),
    url: `https://picsum.photos/41${a()}/30${a()}`,
    name: 'image1.jpg',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    extension: 'jpg',
    size: getRandomNumber(),
    fieldName: 'image',
    fileName: 'image1.jpg',
    fullPath: `https://picsum.photos/41${a()}/30${a()}`,
    originalFileName: 'image1.jpg',
    folder: 'image',
  },
];

export const IMAGES_ARRAY = Object.values(PATH_IMAGE);
