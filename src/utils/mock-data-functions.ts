// get random item from an array
export const getRandomItemFromArray = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};
