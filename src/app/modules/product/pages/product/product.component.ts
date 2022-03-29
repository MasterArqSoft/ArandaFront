import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Column } from 'src/app/interfaces/column';
import { CrudButton } from 'src/app/interfaces/crud-button';
import { Meta, ResponseInterface } from 'src/app/interfaces/response-interface';
import { TableCrud } from 'src/app/interfaces/table-crud';
import { TypeErrorInterface } from 'src/app/interfaces/type-error-interface';
import { ApiService } from 'src/app/services/api.service';
import { ShowTypedataService } from 'src/app/utility/services/show-typedata.service';
import { ValidationsService } from 'src/app/utility/services/validations.service';
import Swal from 'sweetalert2';
import {
  Product,
  productValidMessagesInterface,
} from '../../interface/product';
import { ProductService } from '../../service/product.service';
import { Error } from '../../../../interfaces/error';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  error: Error = {} as Error;
  productList: Product[] = [];
  tableProduct: TableCrud = {} as TableCrud;
  cols: Column[] = [];
  productMeta: Meta = {} as Meta;
  crudButton: CrudButton = {} as CrudButton;
  productForm!: FormGroup;
  product_validation!: productValidMessagesInterface;
  isDisabled: boolean = false;
  imgFile!: string;

  @ViewChild('FormModal') formModal!: ElementRef<any>;
  @ViewChild('file') file!: ElementRef<any>;
  constructor(
    private fb: FormBuilder,
    private productApiSvc: ApiService,
    private erroSvc: ShowTypedataService,
    private validateSvc: ValidationsService,
    private productSvc: ProductService
  ) {}

  ngOnInit(): void {
    this.settingTable();
    this.settingColumns();
    this.productsGet();
    this.createform();
    this.product_validation = this.productSvc.productValidationsMessages;
  }
  createform(): void {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required, Validators.minLength(3)]],
      images: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  settingTable(): void {
    this.tableProduct.nameTable = 'Products';
    this.tableProduct.deleteAllCheck = false;
    this.tableProduct.deleteCheck = false;
  }

  settingColumns() {
    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'description', header: 'Descripción' },
      { field: 'category', header: 'Categoría' },
    ];
  }

  onAddNewProduct(crud: CrudButton) {
    this.crudButton = crud;
    this.clearFied();
    this.imgFile = '';
    this.file.nativeElement.value = '';
  }

  onEditProduct(product: Product) {
    this.productForm.clearAsyncValidators();
    this.productForm.clearValidators();
    this.crudButton = {} as CrudButton;
    this.crudButton.edit = true;
    this.disabled(false);
    this.imgFile =
      product?.images === ''
        ? ''
        : (`data:image/png;base64,${product.images}` as string);
    this.productForm.patchValue({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      images: product.images,
    });
    this.file.nativeElement.value = '';
  }

  onSeeProduct(product: Product) {
    this.productForm.clearAsyncValidators();
    this.productForm.clearValidators();
    this.crudButton = {} as CrudButton;
    this.disabled(true);
    this.imgFile =
      product?.images === ''
        ? ''
        : (`data:image/png;base64,${product.images}` as string);

    this.productForm.patchValue({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      images: '',
    });
    this.file.nativeElement.value = '';
  }

  onDelProduct(product: Product) {
    this.crudButton = {} as CrudButton;
    this.crudButton.delete = true;
    this.onConfirmation(product);
  }

  onNext(page: number): void {
    this.productsGet(page + 1);
  }

  onPreviou(page: number): void {
    this.productsGet(page - 1);
  }

  disabled(value: boolean) {
    this.isDisabled = value;
    if (value) {
      this.productForm.controls['name'].disable();
      this.productForm.controls['description'].disable();
      this.productForm.controls['category'].disable();
      this.productForm.controls['images'].disable();
    } else {
      this.productForm.controls['name'].enable();
      this.productForm.controls['description'].enable();
      this.productForm.controls['category'].enable();
      this.productForm.controls['images'].enable();
    }
  }

  textCrud(): string {
    return this.crudButton?.add
      ? 'Add'
      : this.crudButton?.edit
      ? 'Edit'
      : 'See';
  }

  ShowCrud(): boolean {
    return this.crudButton?.add || this.crudButton?.edit;
  }

  validateField(control: string, validation: TypeErrorInterface): boolean {
    return this.validateSvc.validateField(
      this.productForm.controls[control],
      validation
    );
  }

  clearFied() {
    this.productForm.reset();
    this.productForm.clearAsyncValidators();
    this.productForm.clearValidators();
    this.error = {} as Error;
    this.disabled(false);
  }
  onImageChange(e: any) {
    this.imgFile = '';
    const reader = new FileReader();
    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.productForm.patchValue({
          images: this.imgFile.split(',')[1],
        });
      };
    }
  }
  onProductSave(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.onConfirmation(this.productForm.value);
  }

  onCloseForm() {
    this.clearFied();
    this.formModal.nativeElement.click();
  }

  onConfirmation(product: Product) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${this.textCrud()} it!`,
    }).then(result => {
      if (result.isConfirmed) {
        if (this.crudButton.add) {
          this.productPost(product);
        }
        if (this.crudButton.edit) {
          this.productPut(product);
        }
        if (this.crudButton.delete) {
          this.productDelete(product.id);
        }
      }
    });
  }
  productsGet(page: number = 0): Product[] {
    this.productApiSvc
      .getPaginate<ResponseInterface<Product[]>>('product', page, 2)
      .subscribe(
        (response: ResponseInterface<Product[]>) => {
          if (response.succeeded) {
            this.productList = response.data;
            this.productMeta = response?.meta!;
          } else {
            this.error = this.erroSvc.showerror(
              response.succeeded,
              response.errors,
              response.codeError,
              response.message
            );
          }
        },
        (error: ResponseInterface<string>) => {
          this.error = this.erroSvc.showerror(
            error.succeeded,
            error.errors,
            error.codeError,
            error.message
          );
        }
      );
    return this.productList;
  }

  productPost(product: Product): void {
    this.productApiSvc
      .post<ResponseInterface<Product>>('product', 'product', product)
      .subscribe(
        (response: ResponseInterface<Product>) => {
          if (response.succeeded) {
            this.productsGet();
            Swal.fire('Transacción exitosa', response.message, 'success');
            this.onCloseForm();
          }
        },
        (error: ResponseInterface<string>) => {
          Swal.fire('Transacción no exitosa', error.message, 'error');
          this.error = this.erroSvc.showerror(
            error.succeeded,
            error.errors,
            error.codeError,
            error.message
          );
        }
      );
  }

  productPut(product: Product): void {
    this.productApiSvc
      .put<ResponseInterface<Product>>(
        'product',
        'product',
        product.id,
        product
      )
      .subscribe(
        (response: ResponseInterface<Product>) => {
          if (response.succeeded) {
            this.productsGet();
            Swal.fire('Actualización exitosa', response.message, 'success');
            this.onCloseForm();
          }
        },
        (error: ResponseInterface<string>) => {
          Swal.fire('Transacción no exitosa', error.message, 'error');
          this.error = this.erroSvc.showerror(
            error.succeeded,
            error.errors,
            error.codeError,
            error.message
          );
        }
      );
  }

  productDelete(id: number): void {
    this.productApiSvc
      .delete<ResponseInterface<true>>('product', 'product', id)
      .subscribe(
        (response: ResponseInterface<true>) => {
          if (response.succeeded) {
            this.productsGet();
            Swal.fire('Eliminación exitosa', response.message, 'success');
          }
        },
        (error: ResponseInterface<string>) => {
          Swal.fire(
            'Transacción no exitosa',
            `${error.message} ${error.codeError}`,
            'error'
          );
          this.error = this.erroSvc.showerror(
            error.succeeded,
            error.errors,
            error.codeError,
            error.message
          );
        }
      );
  }
}
