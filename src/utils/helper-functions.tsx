// export const getFormFieldsJson = async (str: string): Promise<Array<any>> =>{
//   const import(`../../data/datatable/formFields/index${str}`);}

// eslint-disable-next-line prefer-exponentiation-operator, no-restricted-properties
export const getRandomNumber = () => Math.ceil(Math.pow(10, 10) * Math.random());

export const createLabelFromArrayStr = (
  arr: string[],
  document: AllModels,
  label: string = ''
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

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// import _cloneDeep from 'lodash/cloneDeep';

// export const setQueryForDataFetching = (originalQueries: string[], query = '', headerQuery = []) => {
//     // metto tutto insieme (queries, headerQuery)
//     const queries = [...originalQueries, ...headerQuery];
//     // check if object is passed as queries
//     if(!Array.isArray(queries)){
//         return `?${queries.key}=${queries.value}`;
//     }
//     // Check if no more execution
//     if(!queries.length) {
//         return query;
//     }
//     // Don't modify arguments.
//     let clonedQuery = query;
//     const targetQuery =queries.shift();
//     // store new queries array without index 0 to pass to recursion fn
//     // check if cloneQuery. First time ?key=value
//     if(!clonedQuery){
//         clonedQuery = `?${targetQuery.key}=${targetQuery.value}`;
//         return setQueryForDataFetching(queries, clonedQuery);
//     }
//     // Here add new query to the string.
//     clonedQuery += `&${targetQuery.key}=${targetQuery.value}`;
//     return setQueryForDataFetching(queries, clonedQuery);

// };
export function isObjectEmpty(value: Record<any, any> | any) {
  return (
    Object.prototype.toString.call(value) === '[object Object]' && JSON.stringify(value) === '{}'
  );
}

export function getCookie(name: string) {
  return document.cookie.split(';').some((c) => c.trim().startsWith(`${name}=`));
}
export function deleteCookie(name: string, path: string, domain: string) {
  if (getCookie(name)) {
    document.cookie = `${name}=${path ? `;path=${path}` : ''}${
      domain ? `;domain=${domain}` : ''
    };expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  }
}

/**
 *
 * - converts all key value pair as url query string. \n setQueryForDataFetching converts array of object instead.
 */
export function createQuery(data: Record<string, string>) {
  const createdQuery = Object.entries(data).reduce((acc, [key, value]) => {
    if (!value) {
      return acc;
    }
    if (acc === '?') {
      acc += `${key}=${value}`;
      return acc;
    }
    acc += `&${key}=${value}`;
    return acc;
  }, '?');
  return createdQuery === '?' ? undefined : createdQuery;
}

// export const getCsvPrimitive = ({
//   array = [],
//   obj,
// }: {
//   array: string[];
//   obj: Record<string, string>;
// }): Record<string, string> => {
//   const data = obj;
//   if (!array.length) {
//     return data;
//   }
//   const newData = data[array[0]];
//   array.shift();
//   return getCsvPrimitive({ array, obj: newData || '' });
// };

export const getDefaultValues = (
  formFields: FormFieldInterface[],
  crudDocument: AllModels = {}
) => {
  /** define defauldValueObj by reduce */
  const defaultValueObj = formFields?.reduce<Record<string, any>>((obj, field) => {
    /** define path field.name or field.id */
    const path = field.name || field.id;

    /**
     *  define case there is a data in path
     *  specifically when passing the crudDocument.
     *  to populate formFields.
     */
    if (_get(crudDocument, path)) {
      /** check if is a object  (field.type === select then fall into here.) */
      if (typeof crudDocument[path] === 'object') {
        const newObj = _set(
          obj,
          path,
          /**  define case if object is array( typof array === 'object')
           * set array of ids as a default values.
           */
          Array.isArray(crudDocument[path])
            ? crudDocument[path].map((list: AllModels) => list._id) || ''
            : /** otherwise set only id as defaultValue */
              crudDocument[path]?._id || ''
        );
        return newObj;
      }

      // Everything else seem to get into this line
      // TODO: query data to be implemented by header not from crudObj when possible
      //  example: I want date values are extracted from headerInputContext. avoid unnecessary looping over array in api.
      obj[path] = crudDocument?.[path] || null;
      return obj;
    }
    if (field.type === 'boolean') {
      obj[path] = crudDocument?.[path] || false;
      return obj;
    }
    if (field.type === 'date') {
      obj[path] = crudDocument?.[path] || new Date(Date.now());
      return obj;
    }
    if (field.type === 'select' && field.multi) {
      obj[path] = crudDocument?.[path] || [];
      return obj;
    }

    if (field.type === 'select') {
      obj[path] = crudDocument?.[path] || null;
      return obj;
    }

    if (field.type === 'number') {
      obj[path] = crudDocument?.[path] || 0;
      return obj;
    }
    obj[path] = crudDocument?.[path] || '';
    return obj;
  }, {});
  // return { name: 'jijij', address: 'static' };
  return defaultValueObj || {};
};

/** Piece of useful function from StackOverflow
 * https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-and-arrays-by-string-path */
export function _get(obj: Record<string, any>, path: string[] | string, separator: string = '.') {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev?.[curr], obj);
}

export function _set(
  obj: Record<string, any>,
  path: string[] | string,
  newValue: any,
  separator: string = '.'
) {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr, index) => {
    /** define case last index of the property set the value */
    if (properties.length === index + 1) {
      prev[curr] = newValue;
      return obj;
    }
    /** new prev value to next reduce function */
    return prev?.[curr];
  }, obj);
}
