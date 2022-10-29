import {
  crudSlice,
  fetchCrudDocuments,
  addCrudDocument,
} from '../../redux/features/crud/crudSlice';
import { useAppDispatch, useAppSelector } from './useRedux';

export const useCrudSlice = (ent?: Sections) => {
  const appDispatch = useAppDispatch();

  crudSlice.reducer;
  const useCrudDocuments = (entity?: string) => {
    console.log(entity);
    return useAppSelector((state) => state.crud.reduxdb?.[entity || ''].documentsArray || null);
  };
  const useAddCrud =
    () =>
    ({ entity, newDocument }: AddCrudPayload) => {
      appDispatch(addCrudDocument({ entity, newDocument }));
    };

  const useFetchCrudDocuments = () => (entity: Sections) => appDispatch(fetchCrudDocuments(entity));

  return {
    addCrud: useAddCrud(),
    crudDocuments: useCrudDocuments(ent),
    fetchCrudDocuments: useFetchCrudDocuments(),
  };
};
