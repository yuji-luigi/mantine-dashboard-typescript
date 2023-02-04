interface FetchCrudPayload {
  entity: Sections;
  query?: string;
  isChildrenTree?: boolean;
}
interface DeleteCrudPayload {
  entity: Sections;
  documentId: string;
  query?: string;
  // paginationQuery?: string;
}
interface UpdateCrudPayload {
  entity: Sections;
  updateData: any;
  documentId: string;
  parentId?: string;
}

interface AddCrudPayload {
  entity: Sections;
  newDocument: AllModels;
  /** specify parentId for creation of child of given id */
  parentId?: string;
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
