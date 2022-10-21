type Sections = 'home' | 'statistics' | 'notifications' | 'billing';

interface SectionDataJson {
  [Sections: string]: {
    slice: string;
    navbar: string;
    link: string;
    title: string;
    subtitle: string;
    createButton?: boolean;
  };
}

type FieldType = 'text' | 'select' | 'static-select' | 'date' | 'number' | 'currency' | 'avatar';
type CellStyles = 'badge' | '';
// type FieldType = FieldTypes[FieldTypes[keyof typeof FieldTypes]];
interface FormField {
  /**
   * id and name of the field.
   *  Dot(.) is not allowed.
   * If the input value will be set to nested property of the object, use name property to use dot(.)
   *
   * example
   * id: 'user-address-city'
   *  name: 'user.address.city'
   */
  id: string;
  /** Set the property in case of nested field.
   * See id property */
  name?: string;
  label: string;
  placeholder?: string;
  type: FieldType;
  /**For type select */
  multi?: boolean;
  /**For type select */
  entitySingle?: string;
  /**For type select */
  entityPlural?: string;
  /**
   * from object. get the property [selectValue[0]] [selectValue[1]]... To show on the DataTable.
   */
  // style: Array<CellStyles>;
  badge?: boolean;
  selectValues?: Array<string>;
  /** Type select. static options*/
  options?: Array<string>;
  /**
   * Hide the input from the form but still send the data
   * inside formData. -> noForm is opposite
   */
  hideFromForm?: boolean;
  /** No table cell */
  noTable?: boolean;
  /** No form, no data will be sent. */
  noForm?: boolean;
  /**
   * Only users who has specified role can fill the field.
   */
  grantTo?: Array<string>;
  required?: boolean;
  priority: number;
}

export type FormFields = {
  [key: string]: Array<FormField>;
};
