import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { sectionData } from '../../../data';
import axiosInstance, { AxiosResData } from '../../../utils/axios-instance';
import { flattenSectionData } from '../../../data';
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
  async ({ entity }: { entity: Sections; query: any }) => {
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

export const updateCrudDocument = createAsyncThunk(
  'crud/updateDocument',
  async ({
    entity,
    updateData,
    documentId,
  }: {
    entity: Sections;
    updateData: any;
    documentId: string;
  }) => {
    const res = await axiosInstance.put(`${entity}/${documentId}`, updateData);
    const payload = {
      entity: res.data.collection,
      updatedDocument: res.data.data as Record<string, any>,
    };
    return payload;
  }
);

export const deleteCrudDocument = createAsyncThunk(
  'crud/deleteDocument',
  async ({
    entity,
    documentId,
    paginationQuery,
  }: {
    entity: Sections;
    documentId: string;
    paginationQuery: string;
  }) => {
    /**
     * in the Api first delete and do getCrudDocuments
     * returns new crudDocuments with limit number
     *  */
    const res = await axiosInstance.delete(`${entity}/${documentId}${paginationQuery}`);
    const payload = {
      entity: res.data.collection,
      documents: res.data.documents,
      documentId,
      totalDocuments: res.data.totalDocuments,
    };
    return payload;
  }
);

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
    /** to reset selectedDocument, set document to null */
    selectCrudDocument: (state, action: PayloadAction<SelectCrudPayload>) => {
      // eslint-disable-next-line prefer-const
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
    setCrudDocuments: (state, action) => {
      const { entity, documents, totalDocuments } = action.payload;
      state.status = 'succeed';
      state.reduxdb[entity].documentsArray = documents;
      state.reduxdb[entity].totalDocuments = totalDocuments;
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
      .addCase(updateCrudDocument.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCrudDocument.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCrudDocument.fulfilled, (state, action) => {
        const { entity, updatedDocument } = action.payload;
        state.status = 'succeed';
        const updatedDocuments = state.reduxdb[entity].documentsArray.map((document) => {
          // TODO: FIX ERROR
          if (document._id === updatedDocument._id) {
            // update
            return updatedDocument;
          }
          // return same
          return document;
        });
        state.reduxdb[entity].documentsArray = updatedDocuments;
      })
      .addCase(deleteCrudDocument.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCrudDocument.fulfilled, (state, action) => {
        const { entity, documents, totalDocuments } = action.payload;
        state.status = 'succeed';
        const newDocumentArray = documents;
        // const newDocumentArray = state.reduxdb[entity].documentsArray.filter(
        //   (document) => document._id !== documentId
        // );
        state.reduxdb[entity].totalDocuments = totalDocuments;
        state.reduxdb[entity].documentsArray = newDocumentArray;
      });
  },
});

// const selectCrudDocuments = (state: any, entity: string, searchId) => state.crud.reduxdb[entity];
// const selectCrudDocumentById = (state: any, entity: string) =>
//   state.crud.reduxdb[entity].find((document) => document._id === searchId);
// const count = useSelector((state) => state.crud.counter);
//   const dispatch = useDispatch();
export const { selectCrudDocument, setCrudDocuments } = crudSlice.actions;

export default crudSlice.reducer;
