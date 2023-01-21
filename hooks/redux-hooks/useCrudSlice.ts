import {
  fetchCrudDocuments,
  addCrudDocument,
  deleteCrudDocument,
  selectCrudDocument,
  updateCrudDocument,
  setCrudDocuments,
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

  /** Set Crud documents fetch outside of the redux the documents and set into reduxDb.documents array */
  const useSetCrudDocuments =
    () =>
    ({ entity = '', documents }: { entity?: Sections; documents: AllModels }) =>
      appDispatch(setCrudDocuments({ entity, documents }));

  /** Get error string sent by api */
  const useCrudDocuments = (entity?: string) =>
    useAppSelector((state) => state.crud.reduxdb?.[entity || '']?.documentsArray || []);

  const useTotalDocumentsCount = (entity?: string) =>
    useAppSelector((state) => state.crud.reduxdb?.[entity || '']?.totalDocuments || 0);

  const useGetSelectedDocument = () => (entity: Sections) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAppSelector((state) => state.crud.reduxdb?.[entity]?.selectedDocument);
  /** use to set crud status to idle */
  // const useResetCrudStatus = () => appDispatch(crudSlice.actions.resetStatus());

  /**
   *  argument is passed when calling the function. not useCrudSlice(entity) call
   *  after use call.
   */

  /** to reset set document to null */
  const useSelectCrudDocument =
    () =>
    ({ entity, document }: { entity: Sections; document: AllModels }) =>
      appDispatch(selectCrudDocument({ entity, document }));

  const useAddCrud =
    () =>
    ({ entity, newDocument, parentId }: AddCrudPayload) => {
      appDispatch(addCrudDocument({ entity, newDocument, parentId }));
    };

  const useUpdateCrudDocument =
    () =>
    ({
      entity,
      updateData,
      documentId,
      parentId,
    }: {
      entity: Sections;
      updateData: any;
      documentId: string;
      parentId?: string;
    }) =>
      appDispatch(updateCrudDocument({ entity, updateData, documentId, parentId }));

  const useDeleteCrudDocument =
    () =>
    ({ entity, documentId, query }: { entity: Sections; documentId: string; query: string }) =>
      appDispatch(deleteCrudDocument({ entity, documentId, paginationQuery: query }));
  // const useDeleteCrudDocument =
  //   () =>
  //   ({ entity, documentId }: { entity: Sections; documentId: string }) =>
  //     appDispatch(deleteCrudDocument({ entity, documentId }));

  const useFetchCrudDocuments =
    () =>
    ({ entity, query }: { entity: Sections; query?: string }) =>
      appDispatch(fetchCrudDocuments({ entity, query }));

  /** TODO: fetchWithQuery, singleDataCrud. */
  return {
    addCrud: useAddCrud(),
    crudDocuments: useCrudDocuments(ent),
    crudMessage: useCrudMessage(),
    crudError: useCrudError(),
    crudStatus: useCrudStatus(),
    fetchCrudDocuments: useFetchCrudDocuments(),
    updateCrudDocument: useUpdateCrudDocument(),
    deleteCrudDocument: useDeleteCrudDocument(),
    totalDocumentsCount: useTotalDocumentsCount(ent),
    selectCrudDocument: useSelectCrudDocument(),
    getSelectedDocument: useGetSelectedDocument(),
    setCrudDocuments: useSetCrudDocuments(),
    // resetCrudStatus: useResetCrudStatus(),
  };
};
