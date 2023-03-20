import { Tuple } from '@mantine/core';

const swDarkBlue = {
  50: '#dff2ff',
  100: '#b4dbfe',
  200: '#87c7fb',
  300: '#5cb7f9',
  400: '#3cabf6',
  500: '#2e99dd',
  600: '#207bac',
  700: '#135b7b',
  800: '#01394b',
  900: '#153742',
} as const;

export type SwDarkBlueType = typeof swDarkBlue;

const valuesDarkBlue = Object.values(swDarkBlue);

export const myColors = {
  'sw-dark-blue': valuesDarkBlue as Tuple<string, 10>,
  'ocean-blue': [
    '#7AD1DD',
    '#5FCCDB',
    '#44CADC',
    '#2AC9DE',
    '#1AC2D9',
    '#11B7CD',
    '#09ADC3',
    '#0E99AC',
    '#128797',
    '#147885',
  ] as Tuple<string, 10>,
  'bright-pink': [
    '#F0BBDD',
    '#ED9BCF',
    '#EC7CC3',
    '#ED5DB8',
    '#F13EAF',
    '#F71FA7',
    '#FF00A1',
    '#E00890',
    '#C50E82',
    '#AD1374',
  ] as Tuple<string, 10>,
};
