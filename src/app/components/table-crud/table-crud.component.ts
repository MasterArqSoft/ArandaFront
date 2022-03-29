import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Column } from 'src/app/interfaces/column';
import { CrudButton } from 'src/app/interfaces/crud-button';
import { Meta } from 'src/app/interfaces/response-interface';
import { TableCrud } from 'src/app/interfaces/table-crud';

@Component({
  selector: 'app-table-crud',
  templateUrl: './table-crud.component.html',
  styleUrls: ['./table-crud.component.css'],
})
export class TableCrudComponent {
  @Input() tableCrud!: TableCrud;
  @Input() dataList!: any;
  @Input() cols!: Column[];
  @Input() meta!: Meta;
  crudButton: CrudButton = {
    add: false,
    edit: false,
    delete: false,
  } as CrudButton;
  @Output() eventEmitCrud: EventEmitter<CrudButton> =
    new EventEmitter<CrudButton>();
  @Output() eventEmitEditEntity: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventEmitSeeEntity: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventEmitDelEntity: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventEmitPreviousPage: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventEmitNextPage: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  onAddNew(): void {
    this.crudButton.add = true;
    this.eventEmitCrud.emit(this.crudButton);
  }

  onEdit(entity: any): void {
    this.eventEmitEditEntity.emit(entity);
  }

  onSee(entity: any): void {
    this.eventEmitSeeEntity.emit(entity);
  }
  onDelete(entity: any): void {
    this.eventEmitDelEntity.emit(entity);
  }
  onNext(page: number): void {
    this.eventEmitNextPage.emit(page);
  }

  onPreviousPage(page: number): void {
    this.eventEmitPreviousPage.emit(page);
  }
}
