import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',

})
export class UserService implements OnInit {
  allProduct: any = [];

  cart: any;

  // private baseUrl = 'http://localhost:3000';
  private baseUrl = 'https://z-store-api-zaa.herokuapp.com';

  userData:any;

  cartlength:any;

  constructor(private http: HttpClient, private ProductsService:ProductsService) {}

  ngOnInit(): void {
    this.updateProduct();
  }

  addUser(formdata: any): any {
    return this.http.post(`${this.baseUrl}/signup`, formdata);
  }

  getAllUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/allUser`);
  }

  getUserData(token: any): any {
    return this.http.get(`${this.baseUrl}/getUserData/${token}`);
  }

  getUserById(id: any): any {
    return this.http.get(`${this.baseUrl}/getUserById/${id}`);
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.baseUrl}/deleteUser/${id}`);
  }

  updateUser(user: any, id: any) {
    return this.http.patch(`${this.baseUrl}/editUser/${id}`, user);
  }

  login(user: any) {
    return this.http.post(`${this.baseUrl}/signIn`, user);
  }

  addpic(img: any) {
    return this.http.post(`${this.baseUrl}/addProfilePic`, img);
  }

  addToCart(product: any, token:any) {
    return this.http.patch(`${this.baseUrl}/addToCart/${token}`, product);
  }

  addToFavorites(product: any, token:any) {
    return this.http.patch(`${this.baseUrl}/addToFavorites/${token}`, product);
  }

  deleteFromCart(token:any, product:any) {
    return this.http.patch(`${this.baseUrl}/deleteFromCart/${token}`, product);
  }

  deleteFromFavorites(token:any, product:any) {
    return this.http.patch(`${this.baseUrl}/deleteFromFavorites/${token}`, product);
  }

  changeQuantityOfProductInCart(token:any, product:any) {
    return this.http.patch(`${this.baseUrl}/changeQuantityOfProductInCart/${token}`, product);
  }

  saveAfterDrag(token:any, data:any) {
    return this.http.patch(`${this.baseUrl}/saveAfterDrag/${token}`, data);
  }

  updateProduct() {
    const token = localStorage.getItem('userToken');
    this.getUserData(token).subscribe((data: any) => {
      this.cart = data.userData.cart;

      for (let i = 0; i < this.cart.length; i++) {
        const element = this.cart[i];
        this.ProductsService.getProductById(element.productId).subscribe(
          (data: any) => {
            this.allProduct.push(data.product);
          },
        );
      }
    });
  }

  editProfilePic(formdata:any){
    return this.http.patch(`${this.baseUrl}/editProfilePic`, formdata);

  }
}
