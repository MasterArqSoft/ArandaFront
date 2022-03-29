import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateFieldsMessagesComponent } from 'src/app/components/validate-fields-messages/validate-fields-messages.component';
import { ValidateSumaryErrorComponent } from './validate-sumary-error/validate-sumary-error.component';
import { TableCrudComponent } from './table-crud/table-crud.component';

@NgModule({
  declarations: [
    ValidateFieldsMessagesComponent,
    ValidateSumaryErrorComponent,
    TableCrudComponent,
  ],
  imports: [CommonModule],
  exports: [
    ValidateFieldsMessagesComponent,
    ValidateSumaryErrorComponent,
    TableCrudComponent,
  ],
})
export class ComponentsModule {}
