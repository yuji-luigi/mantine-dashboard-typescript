import { crudSlice, fetchCrudDocuments } from '../../redux/features/crud/crudSlice';
import { useAppDispatch, useAppSelector } from './useRedux';

export const useCrudSlice = (ent?: Sections) => {
  const appDispatch = useAppDispatch();
  const { addCrud /* , deleteCrud, increment, decrement, incrementByAmount */ } = crudSlice.actions;
  // crudSlice.reducer;
  // const useCrudDocuments = (entity?: string) =>
  //   useAppSelector((state) => state.crud.reduxdb?.[entity || ''].documentsArray || null);
  // const useAddCrud =
  //   () =>
  //   ({ entity, document }: AddCrudPayload) =>
  //     appDispatch(addCrud({ entity, document }));

  // const useFetchCrudDocuments = () => (entity: Sections) => appDispatch(fetchCrudDocuments(entity));

  return {
    // addCrud: useAddCrud(),
    // crudDocuments: useCrudDocuments(ent),
    // fetchCrudDocuments: useFetchCrudDocuments(),
  };
};
