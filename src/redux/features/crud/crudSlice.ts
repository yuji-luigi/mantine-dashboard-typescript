import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRandomNumber } from '../../../utils/helper-functions';
import { API_BASE_URL } from '../../../path/api-routes';
import axiosInstance from '../../../utils/axios-instance';
/* eslint-disable no-param-reassign */

// const fetchUserById = createAsyncThunk<
//   // Return type of the payload creator
//   string,
//   // First argument to the payload creator
//   number,
//   {
//     // Optional fields for defining thunkApi field types
//     dispatch: Dispatch<AnyAction>;
//     state: State;
//     extra: {
//       jwt: string;
//     };
//   }
// >('users/fetchById', async (userId, thunkApi) => {
//   const response = await fetch(`https://reqres.in/api/users/${userId}`, {
//     headers: {
//       Authorization: `Bearer ${thunkApi.extra.jwt}`,
//     },
//   });
//   return (await response.json()) as MyData;
// });

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
    console.log('fagh');
    // const res = await axiosInstance.get(`${API_BASE_URL}/${entity}`);
    return entity;
  }
);
const initialState: CrudState = {
  reduxdb: {
    users: { entity: 'users', documentsArray: [] },
    buildings: { entity: 'buildings', documentsArray: [] },
  },
  status: 'idle',
  error: null,
  counter: 0,
};

export const crudSlice = createSlice({
  name: 'crudOperation',
  initialState,
  reducers: {
    addCrud: (state, action: PayloadAction<AddCrudPayload>) => {
      const { entity, document } = action.payload;
      const pseudoUniqueId = getRandomNumber();
      const modifiedDocument = { ...document, id: pseudoUniqueId };
      state.reduxdb[entity].documentsArray = [
        ...state.reduxdb[entity].documentsArray,
        modifiedDocument,
      ];
    },
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
      });
  },
});

// const selectCrudDocuments = (state: any, entity: string, searchId) => state.crud.reduxdb[entity];
// const selectCrudDocumentById = (state: any, entity: string) =>
//   state.crud.reduxdb[entity].find((document) => document._id === searchId);
// const count = useSelector((state) => state.crud.counter);
//   const dispatch = useDispatch();
export default crudSlice.reducer;
