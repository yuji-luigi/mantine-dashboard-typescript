import {
  fetchCrudDocuments,
  addCrudDocument,
  deleteCrudDocument,
  crudSlice,
} from '../../src/redux/features/crud/crudSlice';
import { useAppDispatch, useAppSelector } from './useRedux';

export const useCrudSlice = (ent?: Sections) => {
  const appDispatch = useAppDispatch();
  /** Get message string sent by api */
  const useCrudMessage = () => useAppSelector((state) => state.crud.message);

  /** Get error string sent by api */
  const useCrudError = () => useAppSelector((state) => state.crud.error);

  /** Get status string set in addCase function */
  const useCrudStatus = () => useAppSelector((state) => state.crud.status);

  /** Get error string sent by api */
  const useCrudDocuments = (entity?: string) =>
    useAppSelector((state) => state.crud.reduxdb?.[entity || '']?.documentsArray || []);
  /** use to set crud status to idle */
  // const useResetCrudStatus = () => appDispatch(crudSlice.actions.resetStatus());

  const useAddCrud =
    () =>
    ({ entity, newDocument }: AddCrudPayload) => {
      appDispatch(addCrudDocument({ entity, newDocument }));
    };
  const useDeleteCrudDocument =
    () =>
    ({ entity, documentId }: { entity: Sections; documentId: string }) =>
      appDispatch(deleteCrudDocument({ entity, documentId }));
  const useFetchCrudDocuments = () => (entity: Sections) => appDispatch(fetchCrudDocuments(entity));

  /** TODO: fetchWithQuery, singleDataCrud. */
  return {
    addCrud: useAddCrud(),
    crudDocuments: useCrudDocuments(ent),
    crudMessage: useCrudMessage(),
    crudError: useCrudError(),
    crudStatus: useCrudStatus(),
    fetchCrudDocuments: useFetchCrudDocuments(),
    deleteCrudDocument: useDeleteCrudDocument(),
    // resetCrudStatus: useResetCrudStatus(),
  };
};
