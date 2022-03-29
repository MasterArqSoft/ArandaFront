import { Component, Input } from '@angular/core';
import { Error } from '../../interfaces/error';

@Component({
  selector: 'app-validate-sumary-error',
  template: `
    <div *ngIf="error?.showError" class="text-danger">
      <p>{{ error.codeError }}</p>
      <p>{{ error.message }}</p>
      <ul
        *ngIf="error.errors && error.errors.length > 0"
        class="validation-summary-errors">
        <li *ngFor="let error of error.errors">
          <i class="fas fa-exclamation-circle"></i> {{ error }}
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      .validation-summary-errors ul,
      .validation-summary-errors li {
        list-style: none;
        margin-left: -40px;
      }
    `,
  ],
})
export class ValidateSumaryErrorComponent {
  @Input() error!: Error;
  constructor() {}
}
