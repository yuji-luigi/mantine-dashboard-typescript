// export const getFormFieldsJson = async (str: string): Promise<Array<any>> =>{
//   const import(`../../data/datatable/formFields/index${str}`);}

// eslint-disable-next-line prefer-exponentiation-operator, no-restricted-properties
export const getRandomNumber = () =>
  Math.ceil(Math.pow(10, 10) * Math.random());

export const createLabelFromArrayStr = (
  arr: string[],
  document: AllModels,
  label: string = ""
): string => {
  const clonedArr = [...arr];

  if (!arr.length) {
    return label;
  }

  const index = clonedArr.shift()!;
  const gotLabel = document[index];
  console.log(!!label);
  label += label ? `${label} - ${gotLabel}` : gotLabel;

  return createLabelFromArrayStr(clonedArr, document, label);
};
