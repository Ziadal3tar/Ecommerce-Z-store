import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { ProductsService } from '../../services/products.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart-on-all',
  templateUrl: './cart-on-all.component.html',
  styleUrls: ['./cart-on-all.component.css'],
})

export class CartOnAllComponent implements OnInit {
  ClickEventSubscription: Subscription;

  @Input() e0 = '';

  @Input() cartlength :any;

  cart: any;

  allProduct: any = [];

  token = localStorage.getItem('userToken');

  allPrice = [];

  // @Input()cartL:any
  @Output() getlength: EventEmitter<any> = new EventEmitter<any>();

  @Output() allproduct: EventEmitter<any> = new EventEmitter<any>();

  @Input() subtotal: any = 0;

  @Output() closeCart: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private UserService: UserService,
    private ProductsService: ProductsService,
    private SharedService: SharedService,
  ) {
    this.ClickEventSubscription = this.SharedService.getClickEvent().subscribe(
      (data) => {
        this.getdata();
        this.getUpdateData(data);

      },
    );
  }

  ngOnInit(): void {
    this.getdata();
  }

  getCartlength() {
    const token = localStorage.getItem('userToken');
    this.UserService.getUserData(token).subscribe((data: any) => {
      this.cartlength = data.userData.cart.length;
      this.getlength.emit(this.cartlength);
    });
  }

  getdata() {
    const token = localStorage.getItem('userToken');
    this.UserService.getUserData(token).subscribe((data: any) => {
      this.cart = data.userData.cart;
      for (let i = 0; i < this.cart.length; i++) {
        const element = this.cart[i];
        this.ProductsService.getProductById(element.productId).subscribe(
          (data: any) => {
            const n2 = this.allProduct.filter(
              (item: any) => item?._id == element.productId,

            );

            if (n2.length == 0) {
              this.allProduct.push(data.product);
            }
          },
        );
      }
      this.Subtotal();
    });
  }

  getUpdateData(data:any) {
    this.allProduct = this.allProduct.filter((item:any) => item._id != data);
    this.Subtotal();
  }

  deleteFromCart(productId: any) {
    const product = {
      productId,
    };
    this.UserService.deleteFromCart(this.token, product).subscribe((data) => {
      this.SharedService.updateAllProduct(product.productId);
      this.SharedService.sendClickEvent();
      this.getCartlength();
    });
    this.allProduct = this.allProduct.filter(
      (item: any) => item._id != productId,

    );
    this.cart = this.cart.filter((item: any) => item.productId != productId);
    this.allproduct.emit(this.allProduct);
    this.Subtotal();
  }

  backCart() {
    this.e0 = '';
    this.closeCart.emit(this.e0);
  }

  Subtotal() {
    if (this.allProduct.length == 0) {
      this.subtotal = 0;
    } else {
      const cc = [];
      for (let i = 0; i < this.cart.length; i++) {
        const element = this.cart[i];
        const product = this.allProduct.filter(
          (item: any) => item._id == element.productId,
        );
        const orderPrice = element.quantity * product[0]?.price;

        cc.push(orderPrice);
      }
      let sum = 0;
      let i = 0;
      while (i < cc.length) {
        sum += cc[i];
        i++;
      }
      this.subtotal = sum;
    }
  }
}
