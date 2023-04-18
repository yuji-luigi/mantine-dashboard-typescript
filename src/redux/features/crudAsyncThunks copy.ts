/*************************************
 *  Created on Sat Feb 04 2023
 *
 *  Copyright (c) 2023 Yuji Sato
 * */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { PATH_API } from '../../path/api-routes';
import axiosInstance, { AxiosResData, uploadConfig } from '../../utils/axios-instance';

interface MediaField {
  [key: string]: File[] | UploadModel[] | [];
  // [Symbol.iterator](): IterableIterator<string>; // to make sure it is iterable
}

export function hasMedia(mediaField: MediaField) {
  for (const key in mediaField) {
    if (mediaField[key]?.length > 0) return true;
  }
  return false;
}

export const HTTP_MULTIPART_CONFIG = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
};

export const fetchCrudDocumentsWithPagination = createAsyncThunk(
  'cruds/fetchCrudDocumentsWithPagination',
  async ({ entity, query, isChildrenTree = false, queryObject = {} }: FetchCrudPayload) => {
    const res = await axiosInstance.get<AxiosResData>(`${entity}${query || ''}`, queryObject);
    return {
      entity,
      isChildrenTree,
      documents: res.data.data,
      totalDocuments: res.data.totalDocuments,
    };
  }
);

export const fetchLinkedChildrenWithPagination = createAsyncThunk(
  'cruds/fetchCrudDocumentsWithPagination',
  async ({ entity, query, /* isChildrenTree = true, */ parentId }: FetchLinkedChildrenPayload) => {
    const res = await axiosInstance.get<AxiosResData>(
      `/linkedChildren/${entity}/${parentId}${query || ''}`
    );
    return {
      entity,
      /**
       * set to be true because is not head
       * ? or put the logic inside reducer.
       */
      isChildrenTree: true,
      documents: res.data.data,
      totalDocuments: res.data.totalDocuments,
    };
  }
);

interface AddCrudPayloadWithConfig extends AddCrudPayload {
  config?: {
    headers: {
      'Content-Type': 'multipart/form-data';
    };
  };
}
/**
 * addCrudDocumentDataTable handles regular crud creation and linkedChildren creation
 * ! Todo: should be separate the functions
 * */
export const addCrudDocumentDataTable = createAsyncThunk(
  'crud/addDocument',
  async ({ entity, newDocument, parentId, query = '', config }: AddCrudPayloadWithConfig) => {
    /** handle endpoint by checking if parentId is passed */
    const endPoint = !parentId ? entity : `${PATH_API.linkedChildren}/${entity}/${parentId}`;
    const res = await axiosInstance.post(`${endPoint}${query}`, newDocument, config);
    const payload = {
      // entity: res.data.collection,
      entity,
      documents: res.data.data,
      // documentId,
      totalDocuments: res.data.totalDocuments,
    };
    return payload;
    // return res.data;
  }
);
export const addLinkedChildrenDocumentDataTable = createAsyncThunk(
  'crud/addDocument',
  async ({ entity, newDocument, parentId, query = '' }: AddCrudPayload) => {
    /** handle endpoint by checking if parentId is passed */
    const endPoint = `${PATH_API.linkedChildren}/${entity}/${parentId}`;
    const res = await axiosInstance.post(`${endPoint}${query}`, newDocument);
    const payload = {
      // entity: res.data.collection,
      entity,
      documents: res.data.data,
      // documentId,
      totalDocuments: res.data.totalDocuments,
    };
    return payload;
    // return res.data;
  }
);

// always return the updated document. without pagination.
export const updateCrudDocument = createAsyncThunk(
  'crud/updateDocument',
  async ({ entity, updateData, documentId }: UpdateCrudPayload) => {
    /** parentId ? then linkedChildren endpoint. else case update normally */
    const endpoint = `${entity}/${documentId}`;
    // const config = hasMedia(updateData.media) ? uploadConfig : {};
    // const endpoint = !parentId
    //   ? `${entity}/${documentId}`
    //   : `/linkedChildren/${entity}/${parentId}`;
    updateData.media = undefined;
    const res = await axiosInstance.put(endpoint, updateData /* config */);
    const payload = {
      // entity: res.data.collection,
      entity,
      updatedDocument: res.data.data as Record<string, any>,
    };
    return payload;
  }
);

export const deleteCrudDocumentWithPagination = createAsyncThunk(
  'crud/deleteDocument',
  async ({ entity, documentId, query = '' }: DeleteCrudPayload) => {
    /**
     * in the Api first delete and do getCrudDocuments
     * returns new crudDocuments with limit number
     *  */
    const res = await axiosInstance.delete(`${entity}/${documentId}${query}`);
    const payload = {
      // entity: res.data.collection,
      entity,
      documents: res.data.data,
      documentId,
      totalDocuments: res.data.totalDocuments,
    };
    return payload;
  }
);

export const deleteLinkedChildDocumentWithPagination = createAsyncThunk(
  'crud/deleteLinkedChildDocumentWithPagination',
  async ({ entity, documentId, query = '' }: DeleteLinkedChildrenPayload) => {
    /**
     * in the Api first delete and do getCrudDocuments
     * returns new crudDocuments with limit number
     *  */
    const res = await axiosInstance.delete(
      `/${PATH_API.linkedChildren}/${entity}/${documentId}${query}`
    );
    const payload = {
      // entity: res.data.collection,
      entity,
      documents: res.data.data,
      documentId,
      totalDocuments: res.data.totalDocuments,
    };
    return payload;
  }
);
