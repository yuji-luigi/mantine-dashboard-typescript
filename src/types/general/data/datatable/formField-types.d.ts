interface FormFieldInterface {
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

  type:
    | 'text'
    | 'long-text'
    | 'boolean'
    | 'select'
    | 'static-select'
    | 'number'
    | 'currency'
    | 'avatar'
    | 'date'
    | 'date-range'
    | 'attachment'
    | 'color';
  /**For type select */
  multi?: boolean;
  /**For type select */
  entitySingle?: string;
  /**For type select */
  entityPlural?: Sections;
  /**
   * from object. get the property [selectValue[0]] [selectValue[1]]... To show on the DataTable.
   */
  // style: Array<CellStyles>;
  badge?: boolean;
  selectValues?: Array<string>;
  /** Type select. static options*/
  options?: Array<SelectOption>;
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
  /** when defined: show the defaultValue on the dataTable.
   */
  priority: number;
}

interface SelectOption {
  /** both must be string or null */
  value: string | null;
  label: string | null;
}
