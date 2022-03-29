import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TypeErrorInterface } from '../../interfaces/type-error-interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseInterface } from 'src/app/interfaces/response-interface';

@Injectable({
  providedIn: 'root',
})
export class ValidationsService {
  constructor() {}

  validateField(
    field: AbstractControl,
    validation: TypeErrorInterface
  ): boolean {
    if (field?.hasError(validation.type) && (field?.dirty || field?.touched)) {
      return true;
    }

    return false;
  }
  validateError(error: HttpErrorResponse): ResponseInterface<string> {
    let errorMessage!: ResponseInterface<string>;
    console.log('validateError => ', error);
    // client-side error
    if (error.error instanceof ErrorEvent) {
      console.log('client-side error');
      errorMessage = this.setError(
        '',
        error.error.isTrusted,
        [],
        'Código error: 0001',
        `Error: (client-side error) ${error.error.message}`
      );
    }
    // server-side error
    if (error instanceof HttpErrorResponse) {
      console.log('server-side error', error);
      if (error.error?.CodeError) {
        console.log('error.error?.Data');
        errorMessage = this.setError(
          error.error?.Data,
          error.error?.Succeeded,
          error.error?.Errors,
          error.error?.CodeError,
          error.error?.Message
        );
      } else {
        console.log('Paila');
        errorMessage = this.setError(
          error.statusText,
          error.ok,
          [],
          `Código error: ${error.status.toString()}`,
          `Error: ${error.message}`
        );
      }
    }

    return errorMessage;
  }

  private setError(
    data: string,
    succeeded: boolean,
    errors: string[],
    codeError: string,
    message: string
  ): ResponseInterface<string> {
    let errorMessage: ResponseInterface<string> =
      {} as ResponseInterface<string>;
    (errorMessage.data = data),
      (errorMessage.succeeded = succeeded),
      (errorMessage.errors = errors),
      (errorMessage.codeError = codeError),
      (errorMessage.message = message);
    console.log('seteo del error - errorMessage', errorMessage);
    return errorMessage;
  }
}
