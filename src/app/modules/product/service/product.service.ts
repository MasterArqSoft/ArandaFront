import { Injectable } from '@angular/core';
import { productValidMessagesInterface } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  product_validation: productValidMessagesInterface = {
    name: [
      { type: 'required', message: 'Nombre es requerido.' },
      { type: 'minlength', message: 'Debe contener minimo tres caracteres.' },
    ],
    description: [
      { type: 'required', message: 'Descripción es requerida.' },
      { type: 'minlength', message: 'Debe contener minimo tres caracteres.' },
    ],
    category: [
      { type: 'required', message: 'Categoria es requerida.' },
      { type: 'minlength', message: 'Debe contener minimo tres caracteres.' },
    ],
    images: [{ type: 'required', message: 'Imagen es requerida.' }],
  };

  constructor() {}

  get productValidationsMessages(): productValidMessagesInterface {
    return this.product_validation;
  }
}
