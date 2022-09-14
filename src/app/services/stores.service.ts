import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class StoresService {
  // private baseUrl = 'http://localhost:3000';
  private baseUrl = 'https://z-store-api-zaa.herokuapp.com';

  constructor(private http: HttpClient) {}
  addStores(formdata: any): any {
    return this.http.post(`${this.baseUrl}/addStores`, formdata);
  }

  getStore(storeId:any){
    return this.http.get(`${this.baseUrl}/getStore/${storeId}`);

  }
  deleteStore(createdBy:any){
    return this.http.get(`${this.baseUrl}/deleteStore/${createdBy}`);

  }
  searchStore(data:any){
    return this.http.post(`${this.baseUrl}/searchStore`, data);

  }
  storDeleted(id:any){
    return this.http.post(`${this.baseUrl}/storDeleted`, id);

  }
  removeStore(id:any){
    return this.http.delete(`${this.baseUrl}/removeStore/${id}`);

  }
  addCategories(storeId:any, data:any){
    return this.http.patch(`${this.baseUrl}/addCategories/${storeId}`,data);

  }
  editStoreData(formdata:any){
    return this.http.patch(`${this.baseUrl}/editStoreData`,formdata);

  }

}
