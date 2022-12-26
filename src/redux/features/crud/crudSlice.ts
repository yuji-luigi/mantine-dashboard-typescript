import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { sectionData } from '../../../data';
import axiosInstance, { AxiosResData } from '../../../utils/axios-instance';
import { flattenSectionData } from '../../../data';
import { isObjectEmpty } from '../../../utils/helper-functions';
/* eslint-disable no-param-reassign */

//TODO: ONDELETE GET REQUEST/ SOME UPDATE REDUX STORE LOGIC IN BACKEND OR IN FRONTEND
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
  async ({ entity, query }: { entity: Sections; query?: string }) => {
    const res = await axiosInstance.get<AxiosResData>(`${entity}${query || ''}`);

    return {
      entity,
      documents: res.data.documents,
      totalDocuments: res.data.totalDocuments,
    };
  }
);

export const fetchCrudDocumentsWithQuery = createAsyncThunk(
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
> */ 'cruds/fetchCrudDocumentsQuery',
  async ({ entity, query }: { entity: Sections; query: any }) => {
    const res = await axiosInstance.get(
      `${entity}${'' /* query here. how to make proper string */}`
    );
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

export const deleteCrudDocument = createAsyncThunk(
  'crud/deleteDocument',
  async ({ entity, documentId }: { entity: Sections; documentId: String }) => {
    const res = await axiosInstance.delete(`${entity}/${documentId}`);
    const payload = {
      entity: res.data.collection,
      documentId: res.data.data.documentId,
    };
    return payload;
  }
);

// function createReduxdb():Reduxdb {
//   const reduxdb = {}
//   Object.entries(sectionData).forEach(([key, value]) => {
//     reduxdb[(value.slice) as Sections] = { entity: value.slice, documentsArray: [] };
//   });
//   return reduxdb as Reduxdb;
// }

// TODO: Auto creation of reduxdb fails in types
// Object.entries(sectionData).forEach(([key, value]) => {
//   reduxdb[value.slice] = { entity: value.slice, documentsArray: [] };
// });

// const reduxdb: Reduxdb = {
//   home: { entity: 'home', documentsArray: [] },
//   users: { entity: 'users', documentsArray: [] },
//   buildings: { entity: 'buildings', documentsArray: [] },
//   billing: { entity: 'billing', documentsArray: [] },
//   statistics: { entity: 'statistics', documentsArray: [] },
//   notifications: { entity: 'notifications', documentsArray: [] },
//   bookmarks: { entity: 'bookmarks', documentsArray: [] },
//   comments: { entity: 'comments', documentsArray: [] },
//   fundRules: { entity: 'fundRules', documentsArray: [] },
//   funds: { entity: 'funds', documentsArray: [] },
//   instances: { entity: 'instances', documentsArray: [] },
//   proposals: { entity: 'proposals', documentsArray: [] },
//   tags: { entity: 'tags', documentsArray: [] },
//   threads: { entity: 'threads', documentsArray: [] },
//   userSettings: { entity: 'userSettings', documentsArray: [] },
//   wallets: { entity: 'wallets', documentsArray: [] },
//   events: { entity: 'events', documentsArray: [] },
//   owners: { entity: 'owners', documentsArray: [] },
// };

const reduxdb: Reduxdb = flattenSectionData.reduce<Reduxdb>((totalData, currentData) => {
  totalData = {
    ...totalData,
    [currentData.sliceName as Sections]: {
      entity: currentData.entity as Sections,
      documentsArray: [],
      totalDocuments: 0,
      selectedDocument: null,
    },
  };
  return totalData;
}, {} as Reduxdb);

const initialState: CrudState = {
  reduxdb,
  status: 'idle',
  error: null,
  message: null,
  counter: 0,
  // selectedDocuments: [],
};

export const crudSlice = createSlice({
  name: 'crudOperation',
  initialState,
  reducers: {
    deleteCrud: (state, action: PayloadAction<Record<string, string>>) => {
      const { entity, documentId } = action.payload;
      state.reduxdb[entity].documentsArray.filter((data) => data._id !== documentId);
    },
    selectCrudDocument: (state, action: PayloadAction<SelectCrudPayload>) => {
      let { entity, document } = action.payload;

      /** Define clearing pattern as passing empty object */
      if (document === null) {
        document = null;
      }
      // if (isObjectEmpty(document)) {
      //   document = {};
      // }
      state.reduxdb[entity].selectedDocument = document;
    },
    resetStatus: (state) => {
      state.status = 'idle';
    },
    // increment: (state) => {
    //   state.counter += 1;
    // },
    // decrement: (state) => {
    //   state.counter -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.counter + action.payload;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCrudDocuments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCrudDocuments.fulfilled, (state, action) => {
        const { entity, documents, totalDocuments } = action.payload;
        state.status = 'succeed';
        state.reduxdb[entity].documentsArray = documents;
        state.reduxdb[entity].totalDocuments = totalDocuments;
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
        const { collection, data }: AddedCrudResponse = action.payload;
        state.status = 'succeed';
        (state.reduxdb[collection].documentsArray as Array<AllModels>).push(data);
      })
      .addCase(deleteCrudDocument.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCrudDocument.fulfilled, (state, action) => {
        const { entity, documentId } = action.payload;
        state.status = 'succeed';
        const newDocumentArray = state.reduxdb[entity].documentsArray.filter(
          (document) => document._id !== documentId
        );
        state.reduxdb[entity].documentsArray = newDocumentArray;
      });
  },
});

// const selectCrudDocuments = (state: any, entity: string, searchId) => state.crud.reduxdb[entity];
// const selectCrudDocumentById = (state: any, entity: string) =>
//   state.crud.reduxdb[entity].find((document) => document._id === searchId);
// const count = useSelector((state) => state.crud.counter);
//   const dispatch = useDispatch();
export const { selectCrudDocument } = crudSlice.actions;

export default crudSlice.reducer;
