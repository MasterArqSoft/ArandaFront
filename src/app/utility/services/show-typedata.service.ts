import { Injectable } from '@angular/core';
import { Error } from '../../interfaces/error';

@Injectable({
  providedIn: 'root',
})
export class ShowTypedataService {
  error: Error = {} as Error;
  constructor() {}
  showerror(
    succeeded: boolean = false,
    errors: string[] = [],
    codeError: string = '',
    message: string = ''
  ): Error {
    this.error.showError = !succeeded;
    this.error.errors = errors;
    this.error.codeError = codeError;
    this.error.message = message;
    return this.error;
  }
}
