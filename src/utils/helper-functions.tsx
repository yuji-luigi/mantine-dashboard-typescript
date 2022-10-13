export const getFormFieldsJson = async (str: string): Promise<Array<any>> =>
  import(`../../data/datatable/formFields/${str}`);
