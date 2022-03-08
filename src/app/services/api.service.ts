import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(controller: string) {
    return this.http.get(`${environment.urlApi}${controller}/listar/`);
  }
  //TODO: validar endpoint
  getGeneric(controller: string) {
    return this.http.get(`${environment.urlApi}${controller}`);
  }

  getId(controller: string, id: string) {
    return this.http.get(`${environment.urlApi}${controller}/filtro/${id}`);
  }

  getPaginate(controller: string, pageNumber: number, records: number) {
    return this.http.get(
      `${environment.urlApi}${controller}/paginar/${pageNumber}/cantidad/${records}`
    );
  }
  //TODO: validar endpoint
  // getFilter<T>(controller: string, filterPaginate: IPaginate<T>) {
  //   return this.http.post(
  //     `${environment.urlApi}${controller}/paginar/filtros`,
  //     filterPaginate
  //   );
  // }

  delete(controller: string, id: string) {
    return this.http.delete(
      `${environment.urlApi}${controller}/eliminar?id=${id}`
    );
  }

  post(controller: string, data: any) {
    return this.http.post(`${environment.urlApi}${controller}/crear`, data);
  }

  put(controller: string, data: any) {
    return this.http.put(`${environment.urlApi}${controller}/editar`, data);
  }

  UploadPost(controller: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(
      `${environment.urlApi}${controller}/importar`,
      formData
    );
  }
}
