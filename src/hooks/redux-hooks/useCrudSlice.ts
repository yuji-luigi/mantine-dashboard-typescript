import {
  fetchCrudDocuments,
  addCrudDocument,
  deleteCrudDocument,
} from "../../redux/features/crud/crudSlice";
import { useAppDispatch, useAppSelector } from "./useRedux";

export const useCrudSlice = (ent?: Sections) => {
  const appDispatch = useAppDispatch();

  const useCrudMessage = () => useAppSelector((state) => state.crud.message);

  const useCrudDocuments = (entity?: string) =>
    useAppSelector(
      (state) => state.crud.reduxdb?.[entity || ""]?.documentsArray || []
    );
  const useAddCrud =
    () =>
    ({ entity, newDocument }: AddCrudPayload) => {
      appDispatch(addCrudDocument({ entity, newDocument }));
    };
  const useDeleteCrudDocument =
    () =>
    ({ entity, documentId }: { entity: Sections; documentId: string }) =>
      appDispatch(deleteCrudDocument({ entity, documentId }));
  const useFetchCrudDocuments = () => (entity: Sections) =>
    appDispatch(fetchCrudDocuments(entity));

  /** TODO: fetchWithQuery, singleDataCrud. */
  return {
    addCrud: useAddCrud(),
    crudDocuments: useCrudDocuments(ent),
    crudMessage: useCrudMessage(),
    fetchCrudDocuments: useFetchCrudDocuments(),
    deleteCrudDocument: useDeleteCrudDocument(),
  };
};
