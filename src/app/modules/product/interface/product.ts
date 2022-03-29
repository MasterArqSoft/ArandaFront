import { TypeErrorInterface } from 'src/app/interfaces/type-error-interface';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  images: string;
}

export interface productValidMessagesInterface {
  name: Array<TypeErrorInterface>;
  description: Array<TypeErrorInterface>;
  category: Array<TypeErrorInterface>;
  images: Array<TypeErrorInterface>;
}
