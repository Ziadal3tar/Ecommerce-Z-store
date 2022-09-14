import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'https://z-store-api-zaa.herokuapp.com';
  // private baseUrl = 'http://localhost:3000';

  maleCategory = ['All', 'T-Shirts', 'Polos', 'Pants', 'Jeans', 'Shorts', 'Sportswear', 'Shoses'];

  femaleCategory = ['All', 'Dresses', 'Suits & Blazers', 'Tops & Tees', 'Coats , Jackets & Vests', 'Jumpsuits, Rompers & Overalls', 'Skirts', 'Lingerie', 'Sleep & Lounge', 'Jeans', 'Shorts'];

  kidsCategory = ['All', 'T-Shirts', 'Pants', 'Shoses'];

  constructor(
    private http:HttpClient,
  ) { }

  addproduct(formdata:any): any {
    return this.http.post(`${this.baseUrl}/addProduct`, formdata);
  }

  getProduct() {
    return this.http.get(`${this.baseUrl}/allProduct`);
  }

  getProductById(id: any) {
    return this.http.get(`${this.baseUrl}/getProductById/${id}`);
  }

  deleteProductById(id: any) {
    return this.http.delete(`${this.baseUrl}/deleteProductById/${id}`);
  }

  ifDeletedProduct(data:any){
    return this.http.patch(`${this.baseUrl}/ifDeletedProduct`,data);


  }
}
