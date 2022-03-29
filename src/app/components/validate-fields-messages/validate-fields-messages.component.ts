import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validate-fields-messages',
  template: `
    <div *ngIf="showMessage" class="text-danger">
      {{ message }}
    </div>
  `,
  styles: [],
})
export class ValidateFieldsMessagesComponent {
  @Input() message!: string;
  @Input() showMessage!: boolean;
  constructor() {}
}
