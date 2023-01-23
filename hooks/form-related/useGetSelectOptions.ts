import { useEffect } from 'react';
import { createLabelFromArrayStr } from '../../src/utils/helper-functions';
import { useCrudSlice } from '../redux-hooks/useCrudSlice';

export const useGetSelectOptions = (formField: FormFieldInterface): Array<SelectOption> | [] => {
  // const options: Array<SelectOption> = [];
  // const [idleDocuments, setIdleDocuments] = useState<SelectOption[]>([]);
  /** fetch with query,  */
  const { fetchCrudDocuments, crudDocuments } = useCrudSlice(formField.entityPlural);

  useEffect(() => {
    if (formField.type === 'select') {
      fetchCrudDocuments({ entity: formField.entityPlural! });
    }
  }, [formField]);

  if (formField.type === 'select') {
    /** todo: to include infinite scrolling? */
    const options = crudDocuments.map((document: MongooseBaseModel<null>) => {
      const label = createLabelFromArrayStr(formField.selectValues!, document);
      return { value: document._id, label };
    });
    return options;
  }

  if (formField.type === 'static-select') {
    /** static-select type must have options Array<SelectOptions> */
    return formField.options!;
  }
  return [];
};
