/*************************************
 *  Created on Sat Feb 04 2023
 *
 *  Copyright (c) 2023 Yuji Sato
 * */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_PATH } from '../../path/api-routes';
import axiosInstance, { AxiosResData } from '../../utils/axios-instance';

export const HTTP_MULTIPART_CONFIG = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
};

export const fetchCrudDocuments = createAsyncThunk(
  'cruds/fetchCrudDocuments',
  async ({ entity, query, isChildrenTree = false }: FetchCrudPayload) => {
    const res = await axiosInstance.get<AxiosResData>(`${entity}${query || ''}`);
    return {
      entity,
      isChildrenTree,
      documents: res.data.data,
      totalDocuments: res.data.totalDocuments,
    };
  }
);

export const fetchLinkedChildren = createAsyncThunk(
  'cruds/fetchCrudDocuments',
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
 * addCrudDocument handles regular crud creation and linkedChildren creation
 * ! Todo: should be separate the functions
 * */
export const addCrudDocument = createAsyncThunk(
  'crud/addDocument',
  async ({ entity, newDocument, parentId, query = '', config }: AddCrudPayloadWithConfig) => {
    /** handle endpoint by checking if parentId is passed */
    const endPoint = !parentId ? entity : `${API_PATH.linkedChildren}/${entity}/${parentId}`;
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
export const addLinkedChildrenDocument = createAsyncThunk(
  'crud/addDocument',
  async ({ entity, newDocument, parentId, query = '' }: AddCrudPayload) => {
    /** handle endpoint by checking if parentId is passed */
    const endPoint = `${API_PATH.linkedChildren}/${entity}/${parentId}`;
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

export const updateCrudDocument = createAsyncThunk(
  'crud/updateDocument',
  async ({ entity, updateData, documentId }: UpdateCrudPayload) => {
    /** parentId ? then linkedChildren endpoint. else case update normally */
    const endpoint = `${entity}/${documentId}`;
    // const endpoint = !parentId
    //   ? `${entity}/${documentId}`
    //   : `/linkedChildren/${entity}/${parentId}`;
    const res = await axiosInstance.put(endpoint, updateData);
    const payload = {
      // entity: res.data.collection,
      entity,
      updatedDocument: res.data.data as Record<string, any>,
    };
    return payload;
  }
);

export const deleteCrudDocument = createAsyncThunk(
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

export const deleteLinkedChildDocument = createAsyncThunk(
  'crud/deleteLinkedChildDocument',
  async ({ entity, documentId, query = '' }: DeleteLinkedChildrenPayload) => {
    /**
     * in the Api first delete and do getCrudDocuments
     * returns new crudDocuments with limit number
     *  */
    const res = await axiosInstance.delete(
      `/${API_PATH.linkedChildren}/${entity}/${documentId}${query}`
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
