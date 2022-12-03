import { useEffect, useState } from "react";
import { createLabelFromArrayStr } from "../../utils/helper-functions";
import { useCrudSlice } from "../redux-hooks/useCrudSlice";

export const useGetSelectOptions = (
  formField: FormFieldInterface
): Array<SelectOption> | null => {
  // const options: Array<SelectOption> = [];
  const [idleDocuments, setIdleDocuments] = useState<SelectOption[]>([]);
  /** fetch with query,  */
  const { fetchCrudDocuments, crudDocuments } = useCrudSlice(
    formField.entityPlural
  );

  useEffect(() => {
    if (formField.type === "select") {
      fetchCrudDocuments(formField.entityPlural!);
    }
  }, [formField]);

  if (formField.type === "select") {
    const options = crudDocuments.map((document: MongooseBaseModel<null>) => {
      const label = createLabelFromArrayStr(formField.selectValues!, document);
      return { value: document._id, label };
    });
    return options;
  }

  if (formField.type === "static-select") {
    /** static-select type must have options Array<SelectOptions> */
    return formField.options!;
  }
  return null;
};
