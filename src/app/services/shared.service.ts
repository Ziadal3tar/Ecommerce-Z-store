import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ProductsService } from './products.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  cart: any;

  subtotal:any;

  private subject = new Subject<any>();

  // private allproduct = new BehaviorSubject<any>([])
  // allProduct = this.allproduct.asObservable()
  constructor(private UserService:UserService, private ProductsService:ProductsService) {}

  sendClickEvent() {
    this.subject.next({});
  }

  updateAllProduct(id:any) {
    this.subject.next(id);
  }

  getClickEvent():Observable<any> {
    return this.subject.asObservable();
  }

  addFavorites(id:any) {
    const product = {
      productId: id,
    };
    const token = localStorage.getItem('userToken');
    this.UserService.addToFavorites(product, token).subscribe((data: any) => {
      return data;
    });
  }

  addToCart(id:any) {
    const product = {
      productId: id,
      quantity: 1,
    };
    const token = localStorage.getItem('userToken');
    this.UserService.addToCart(product, token).subscribe((data: any) => {
      this.sendClickEvent();
    });
  }

  deleteFromFavorites(id:any) {
    const product = {
      productId: id,
    };
    const token = localStorage.getItem('userToken');

    this.UserService.deleteFromFavorites(token, product).subscribe((data: any) => {
    });
  }


}
