import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sectionData } from '../../../data';
import axiosInstance from '../../../utils/axios-instance';
/* eslint-disable no-param-reassign */

export const fetchCrudDocuments = createAsyncThunk(
  /* <
  any,
  AddCrudPayload,
  {
    state: CrudState;
    extra: {
      error: { message: string };
    };
    rejectValue: { error: { message: string } };
  }
> */ 'cruds/fetchCrudDocuments',
  async (entity: Sections) => {
    const res = await axiosInstance.get(entity);
    return { entity, documents: res.data.data };
  }
);

export const addCrudDocument = createAsyncThunk(
  'crud/addDocument',
  async ({ entity, newDocument }: { entity: Sections; newDocument: AllModels }) => {
    try {
      const res = await axiosInstance.post(entity, newDocument);
      return res.data;
    } catch (error: any) {
      console.error(error.message || error);
      throw error;
    }
  }
);

const reduxdb: ReduxDbEntity<AllModels> = {};
Object.entries(sectionData).forEach(([key, value]) => {
  reduxdb[value.slice] = { entity: value.slice, documentsArray: [] };
});
console.log({ reduxdb });

const initialState: CrudState = {
  reduxdb /* : {    users: { entity: 'users', documentsArray: [] },
    buildings: { entity: 'buildings', documentsArray: [] },
    statistics: { entity: 'buildings', documentsArray: [] },
  } */,
  status: 'idle',
  error: null,
  counter: 0,
};

export const crudSlice = createSlice({
  name: 'crudOperation',
  initialState,
  reducers: {
    // addCrud: (state, action: PayloadAction<AddCrudPayload>) => {
    //   const { entity, newDocument } = action.payload;
    //   const pseudoUniqueId = getRandomNumber();
    //   const modifiedDocument = { ...document, id: pseudoUniqueId };
    //   state.reduxdb[entity].documentsArray = [
    //     ...state.reduxdb[entity].documentsArray,
    //     modifiedDocument,
    //   ];
    // },
    deleteCrud: (state, action: PayloadAction<Record<string, string>>) => {
      const { entity, documentId } = action.payload;
      state.reduxdb[entity].documentsArray.filter((data) => data._id !== documentId);
    },
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
    incrementByAmount: (state, action) => {
      state.counter + action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCrudDocuments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCrudDocuments.fulfilled, (state, action) => {
        const { entity, documents } = action.payload;
        state.status = 'succeed';
        state.reduxdb[entity].documentsArray = documents;
      })
      .addCase(fetchCrudDocuments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCrudDocument.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCrudDocument.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCrudDocument.fulfilled, (state, action) => {
        const { collection, data }: AddedCrudResponce = action.payload;
        state.status = 'succeed';
        // TODO: AllModels shows any. Don't know why.
        (state.reduxdb[collection].documentsArray as Array<AllModels>).push(data);
      });
  },
});

// const selectCrudDocuments = (state: any, entity: string, searchId) => state.crud.reduxdb[entity];
// const selectCrudDocumentById = (state: any, entity: string) =>
//   state.crud.reduxdb[entity].find((document) => document._id === searchId);
// const count = useSelector((state) => state.crud.counter);
//   const dispatch = useDispatch();
export default crudSlice.reducer;
