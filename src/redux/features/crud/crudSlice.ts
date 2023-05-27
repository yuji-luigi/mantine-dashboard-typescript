import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCrudDocumentsWithPagination,
  addCrudDocumentDataTable,
  updateCrudDocument,
  deleteCrudDocumentWithPagination,
  fetchLinkedChildrenWithPagination,
  addLinkedChildrenDocumentDataTable,
  deleteLinkedChildDocumentWithPagination,
  addCrudDocument,
} from '../crudAsyncThunks';
// import { sectionData } from '../../../data';
import { flattenSectionData } from '../../../data';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks/useRedux';
import { Sections } from '../../../types/general/data/sections-type';
// import { appDispatch } from '../../store';
/* eslint-disable no-param-reassign */

// flat section data since it is nested
const reduxdb: Reduxdb = flattenSectionData.reduce<Reduxdb>((totalData, currentData) => {
  totalData = {
    ...totalData,
    [currentData.entity as Sections]: {
      entity: currentData.entity as Sections,
      documentsArray: [],
      totalDocuments: 0,
      selectedDocument: null,
      selectedDocuments: [],
      isChildrenTree: false,
    },
  };
  return totalData;
}, {} as Reduxdb);

const initialState: CrudState = {
  reduxdb,
  status: 'idle',
  submitting: false,
  error: null,
  message: null,
};

//TODO: ONDELETE GET REQUEST/ SOME UPDATE REDUX STORE LOGIC IN BACKEND OR IN FRONTEND

export const crudSlice = createSlice({
  name: 'crudOperation',
  initialState,
  reducers: {
    deleteCrud: (state, action: PayloadAction<Record<string, string>>) => {
      const { entity, documentId } = action.payload;
      state.reduxdb[entity].documentsArray.filter((data) => data._id !== documentId);
    },
    /** update by new document already fetched. */
    updateCrudDocumentInStore: (state, action: PayloadAction<UpdateCrudDocumentInStorePayload>) => {
      const { document, entity } = action.payload;
      const documentIndex = state.reduxdb[entity].documentsArray.findIndex(
        (doc) => doc._id === document._id
      );
      state.reduxdb[entity].documentsArray[documentIndex] = document;
    },
    /** to reset selectedDocument, set document to null */
    selectCrudDocument: (state, action: PayloadAction<SelectCrudPayload>) => {
      // eslint-disable-next-line prefer-const
      let { entity, documentId, document } = action.payload;
      /** if both are null/undefined clean up the state */
      if (!documentId && !document) {
        state.reduxdb[entity].selectedDocument = null;
        return;
      }
      /** if the payload is object set itself in the store */
      if (document) {
        state.reduxdb[entity].selectedDocument = document;
      } else {
        /** if id is present then find from existing documents array */
        state.reduxdb[entity].selectedDocument =
          // state.reduxdb[entity].selectedDocument.find((doc: AllModels) => doc._id === documentId) ||
          state.reduxdb[entity].documentsArray.find((doc: AllModels) => doc._id === documentId) ||
          null;
      }
    },
    resetStatus: (state) => {
      state.status = 'idle';
    },
    setCrudDocument: (state, action) => {
      const { document, entity } = action.payload;
      state.reduxdb[entity].selectedDocument = document;
    },
    setCrudDocuments: (state, action) => {
      const { entity, documents, totalDocuments, isChildrenTree } = action.payload;

      state.status = 'succeed';
      state.reduxdb[entity].isChildrenTree = isChildrenTree;
      state.reduxdb[entity].documentsArray = documents;
      state.reduxdb[entity].totalDocuments = totalDocuments;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      /**
       * FETCH DOCUMENTS
       */
      .addCase(fetchCrudDocumentsWithPagination.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCrudDocumentsWithPagination.fulfilled, (state, action) => {
        const { entity, documents, totalDocuments, isChildrenTree } = action.payload;
        state.status = 'succeed';
        state.reduxdb[entity].isChildrenTree = isChildrenTree;
        state.reduxdb[entity].documentsArray = documents;
        state.reduxdb[entity].totalDocuments = totalDocuments;
      })
      .addCase(fetchCrudDocumentsWithPagination.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      /**
       * ADD/CREATE NEW DOCUMENT
       */
      .addCase(addCrudDocumentDataTable.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCrudDocumentDataTable.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCrudDocumentDataTable.fulfilled, (state, action) => {
        const { entity, /* documentId, */ totalDocuments, documents } = action.payload;
        state.status = 'succeed';
        // const newDocumentArray = documents;
        // const newDocumentArray = state.reduxdb[entity].documentsArray.filter(
        //   (document) => document._id !== documentId
        // );
        const prevDocuments = state.reduxdb[entity].documentsArray;
        state.reduxdb[entity].totalDocuments = totalDocuments;
        state.reduxdb[entity].documentsArray = documents;
        // const { collection, data }: AddedCrudResponse = action.payload;
        // state.status = 'succeed';
        // (state.reduxdb[collection].documentsArray as Array<AllModels>).push(data);
      })
      .addCase(addLinkedChildrenDocumentDataTable.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addLinkedChildrenDocumentDataTable.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addLinkedChildrenDocumentDataTable.fulfilled, (state, action) => {
        const { entity, /* documentId, */ totalDocuments, documents } = action.payload;
        state.status = 'succeed';
        // const newDocumentArray = documents;
        // const newDocumentArray = state.reduxdb[entity].documentsArray.filter(
        //   (document) => document._id !== documentId
        // );
        const prevDocuments = state.reduxdb[entity].documentsArray;
        state.reduxdb[entity].totalDocuments = totalDocuments;
        state.reduxdb[entity].documentsArray = documents;
        // const { collection, data }: AddedCrudResponse = action.payload;
        // state.status = 'succeed';
        // (state.reduxdb[collection].documentsArray as Array<AllModels>).push(data);
      })
      /**
       * UPDATE/MODIFY A DOCUMENT
       */
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
        // if (state.reduxdb[entity].selectedDocument) {
        state.reduxdb[entity].selectedDocument = updatedDocument;
        // }
      })
      /**
       * DELETE A DOCUMENT
       */
      .addCase(deleteCrudDocumentWithPagination.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCrudDocumentWithPagination.fulfilled, (state, action) => {
        const { entity, totalDocuments, documents } = action.payload;
        state.status = 'succeed';
        const newDocumentArray = documents;
        // const newDocumentArray = state.reduxdb[entity].documentsArray.filter(
        //   (document) => document._id !== documentId
        // );
        state.reduxdb[entity].totalDocuments = totalDocuments;
        state.reduxdb[entity].documentsArray = newDocumentArray;
      })
      .addCase(deleteLinkedChildDocumentWithPagination.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteLinkedChildDocumentWithPagination.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteLinkedChildDocumentWithPagination.fulfilled, (state, action) => {
        const { entity, totalDocuments, documents } = action.payload;
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

export const {
  selectCrudDocument,
  setCrudDocuments,
  setSubmitting,
  deleteCrud,
  resetStatus,
  setCrudDocument,
  updateCrudDocumentInStore,
} = crudSlice.actions;

export default crudSlice.reducer;

export const useCrudSliceStore = () => {
  const appDispatch = useAppDispatch();

  return {
    /** update single document in array without calling api. with already new document fetched. or updated in some how */
    updateCrudDocumentInStore(data: UpdateCrudDocumentInStorePayload) {
      appDispatch(crudSlice.actions.updateCrudDocumentInStore(data));
    },
    /** get documents from api and set in documentsArray in redux */
    fetchCrudDocumentsWithPagination(data: FetchCrudPayload) {
      appDispatch(fetchCrudDocumentsWithPagination(data));
    },
    /** get children documents from api and set in documentsArray in redux */
    fetchLinkedChildrenWithPagination(data: FetchLinkedChildrenPayload) {
      appDispatch(fetchLinkedChildrenWithPagination(data));
    },
    createCrudDocument(data: AddCrudPayload) {
      appDispatch(addCrudDocument(data));
    },
    /** add new document in api and issert in redux. */
    createCrudDocumentWithPagination(data: AddCrudPayload) {
      appDispatch(addCrudDocumentDataTable(data));
    },
    /** add new document in api and insert in redux. */
    createLinkedChildDocumentWithPagination(data: AddLinkedChildPayload) {
      appDispatch(addLinkedChildrenDocumentDataTable(data));
    },
    /** update in Api and update new document with old document in redux */
    updateCrudDocument(data: UpdateCrudPayload) {
      appDispatch(updateCrudDocument(data));
    },
    /** delete from Api and redux */
    deleteCrudDocumentWithPagination(data: DeleteCrudPayload) {
      appDispatch(deleteCrudDocumentWithPagination(data));
    },
    /** delete from Api and redux */
    deleteLinkedChildDocumentWithPagination(data: DeleteLinkedChildrenPayload) {
      appDispatch(deleteLinkedChildDocumentWithPagination(data));
    },
    /** set object in selectedDocument in Reduxdb*/
    selectCrudDocument(data: SelectCrudPayload) {
      appDispatch(selectCrudDocument(data));
    },
    setCrudDocuments(data: SetCrudDocumentsPayload) {
      appDispatch(setCrudDocuments(data));
    },
    setCrudDocument(data: SetCrudDocumentPayload) {
      appDispatch(setCrudDocument(data));
    },
    setSubmitting(bool: boolean) {
      appDispatch(setSubmitting(bool));
    },
    resetCrudStatus() {
      appDispatch(resetStatus());
    },
  };
};

/** Returns Array of Documents of the entity: whole array of entity */
const useCrudDocuments = (entity?: Sections): AllModels[] =>
  useAppSelector((state) => state.crud.reduxdb?.[entity || '']?.documentsArray);

/** returns string if api sent message */
const useCrudMessage = () => useAppSelector((state) => state.crud.message);

/** returns status string during api call process */
const useCrudStatus = () => useAppSelector((state) => state.crud.status);

/** returns string if error is present. show flash on the screen */
const useCrudError = () => useAppSelector((state) => state.crud.error);

/** total document selector for entity */
const useTotalDocumentsCount = (entity?: Sections): number =>
  useAppSelector((state) => state.crud.reduxdb?.[entity || '']?.totalDocuments || 0);

/** if it has a parent returns true. ex- space instances can be either a parent or a child */
const useIsChildrenTree = (entity?: Sections): boolean =>
  useAppSelector((state) => state.crud.reduxdb?.[entity || '']?.isChildrenTree);

/** Returns selected Document of the entity or if not selected returns null  */
const useSelectedDocument = (entity?: Sections): AllModels =>
  useAppSelector((state) => state.crud.reduxdb?.[entity || '']?.selectedDocument || {});

/** Hook for selector. this time need do pass entity when initialize the hook. */
export const useCrudSelectors = (entity?: Sections) => ({
  /** Returns Array of Documents of the entity: whole array of entity */
  crudDocuments: useCrudDocuments(entity) || [],
  /** Returns selected Document of the entity */
  selectedCrudDocument: useSelectedDocument(entity) || null,
  /** returns string if error is present. to show flash on the screen */
  crudError: useCrudError(),
  /** returns string if api sent message */
  crudMessage: useCrudMessage(),
  /** returns status string during api call process */
  crudStatus: useCrudStatus(),
  /** if it has a parent returns true. ex- space instances can be either a parent or a child */
  isChildrenTree: useIsChildrenTree(entity),
  /** number of total documents in queried array from db. */
  totalDocumentsCount: useTotalDocumentsCount(entity),
  submitting: useAppSelector((state) => state.crud.submitting),
  selectDocumentById: useAppSelector((state) => (documentId: string) => {
    return state.crud.reduxdb?.[entity || '']?.documentsArray.find((doc) => {
      return doc._id === documentId;
    });
  }),
});
