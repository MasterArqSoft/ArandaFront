export interface IResponse<T> {
  Data: T;
  Succeeded: boolean;
  Errors?: string[];
  Message: string;
}
