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

  getGeneric(controller: string) {
    return this.http.get(`${environment.urlApi}${controller}`);
  }

  getId(controller: string, id: string) {
    return this.http.get(`${environment.urlApi}${controller}/filtro/${id}`);
  }

  getPaginate<T>(controller: string, pageNumber: number, records: number) {
    return this.http.get<T>(
      `${environment.urlApi}${controller}/listado?PageSize=${records}&PageNumber=${pageNumber}`
    );
  }
  delete<T>(controller: string, method: string, id: number) {
    return this.http.delete<T>(
      `${environment.urlApi}${controller}/${method}/${id}`
    );
  }

  post<T>(controller: string, method: string, data: any) {
    return this.http.post<T>(
      `${environment.urlApi}${controller}/${method}`,
      data
    );
  }

  put<T>(controller: string, method: string, id: number, data: any) {
    return this.http.put<T>(
      `${environment.urlApi}${controller}/${method}/${id}`,
      data
    );
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
