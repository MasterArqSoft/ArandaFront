export interface ResponseInterface<T> {
  data: T;
  succeeded?: boolean;
  errors?: string[];
  codeError?: string;
  message: string;
  meta?: Meta;
}

export interface Meta {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string;
  previousPageUrl: string;
}
