interface FetchCrudPayload {
  entity: Sections;
  query?: string;
  isChildrenTree?: boolean;
}
/** has parentId */
interface FetchLinkedChildrenPayload {
  entity: Sections;
  query?: string;
  parentId: string;
  /** always true in this call */
  /*   isChildrenTree?: true;
   */
}
interface DeleteCrudPayload {
  entity: Sections;
  documentId: string;
  query?: string;
  // paginationQuery?: string;
}

interface DeleteLinkedChildrenPayload extends DeleteCrudPayload {
  // parentId: string;
  // paginationQuery?: string;
}
interface UpdateCrudPayload {
  entity: Sections;
  /** form.values */
  updateData: any;
  documentId: string;
  parentId?: string;
}

interface AddCrudPayload {
  entity: Sections;
  /** form.values */
  newDocument: AllModels;
  /** specify parentId for creation of child of given id */
  parentId?: string;
  query?: string;
  config?: any;
}
interface AddLinkedChildPayload {
  entity: Sections;
  /** form.values */
  newDocument: AllModels;
  /** specify parentId for creation of child of given id */
  parentId: string;
  query?: string;
}

type AddCrudPayload = {
  entity: Sections;
  newDocument: AllModels;
  parentId?: string;
};

interface SelectCrudPayload {
  entity: Sections;
  document?: AllModels;
  documentId?: string | null;
}

interface SetCrudDocumentsPayload {
  entity?: Sections;
  documents: AllModels;
  isChildrenTree?: boolean;
}
