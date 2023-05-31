import { _get, _set } from './helper-functions';

export function getDefaultValues(
  formFields: FormFieldInterface[],
  crudDocument: AllModels = {},
  parentId?: string
) {
  /** define defauldValueObj by reduce */
  const defaultValueObj = formFields?.reduce<Record<string, any>>((obj, field) => {
    /** define path field.name or field.id */
    const path = field.name || field.id;
    /**§
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
            ? crudDocument[path].map((list: AllModels) => list._id || list) || ''
            : /** otherwise set only id as defaultValue */
              crudDocument[path]?._id || ''
        );

        if (field.type === 'attachment' || field.type === 'image') {
          // newObj.mediaPreview = {
          //   ...newObj.mediaPreview,
          //   [path]: crudDocument[path].map((file: UploadModel) => file.url),
          // };
          newObj.media = {
            ...newObj.media,
            [path]: crudDocument[path],
          };
        }

        return newObj;
      }
      if (parentId) {
        obj.parentId = parentId;
        return obj;
      }

      // Everything else seem to get into this line
      // TODO: query data to be implemented by header not from crudObj when possible
      //  example: I want date values are extracted from headerInputContext. avoid unnecessary looping over array in api.
      obj[path] = crudDocument?.[path] || null;
      // password is always empty
      if (path === 'password') {
        obj[path] = undefined;
      }
      return obj;
    }

    // fallbackValues

    if (field.multi) {
      obj[path] = [];
    } else {
      obj[path] = fallbackValues[field.type];
    }
    return obj;

    // ! TODO: remove all autopopulate
    if (field.type === 'boolean' || field.type === 'checkbox') {
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
    if (field.type === 'attachment' || field.type === 'image') {
      // set id of the file
      obj.media = { ...obj.media, [path]: crudDocument[path] };
      return obj;
      // set file preview url
      // obj.media = { [path]: crudDocument[field.preview!] || {} };
    }

    obj[path] = crudDocument?.[path] || '';
    return obj;
  }, {});
  return defaultValueObj || {};
}

const fallbackValues = {
  text: '',
  'long-text': '',
  boolean: false,
  checkbox: false,
  select: null,
  'static-select': null,
  number: 0,
  currency: 0,
  avatar: null,
  date: new Date(Date.now()),
  'date-range': new Date(Date.now()),
  attachment: null,
  image: null,
  color: '',
};
