import {
  Component, Input, OnInit, Output, EventEmitter,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { CartOnAllComponent } from '../cart-on-all/cart-on-all.component';
import { SharedService } from '../../services/shared.service';
import { ProductsService } from '../../services/products.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartOnAllComponent],
})
export class CartComponent implements OnInit {
  ClickEventSubscription: Subscription;

  cart: any;

  allProduct: any = [];

  subtotal: any;

  @Input() cartlength: any;

  userdata: any;

  token = localStorage.getItem('userToken');

  Total:any

  constructor(
    private UserService: UserService,
    private ProductsService: ProductsService,
    private SharedService: SharedService,
    private CartOnAllComponent: CartOnAllComponent
  ) {
    this.ClickEventSubscription = this.SharedService.getClickEvent().subscribe(
      (data: any) => {
        this.getUpdateData(data);
      }
    );
  }

  ngOnInit(): void {
    this.getdata();

  }


  getdata() {

    const token = localStorage.getItem('userToken');
    this.UserService.getUserData(token).subscribe((data: any) => {
      this.cart = data.userData.cart;
      this.cartlength = data.userData.cart.length;
      this.userdata = data.userData;

      for (let i = 0; i < this.cart.length; i++) {
        const element = this.cart[i];
        this.ProductsService.getProductById(element.productId).subscribe(
          (data: any) => {
            this.allProduct.push(data.product);
          }

        );

      }
      this.Subtotal()


    });

  }

  getUpdateData(data: any) {
    this.allProduct = this.allProduct.filter((item: any) => item._id != data);
    this.cartlength = this.allProduct.length;
    this.Subtotal()
  }

  deleteFromCart(productId: any) {
    const product = {
      productId,
    };

    this.UserService.deleteFromCart(this.token, product).subscribe((data) => {
      this.SharedService.updateAllProduct(product.productId);
      this.SharedService.sendClickEvent();
    });

    for (let i = 0; i < this.allProduct.length; i++) {
      const element = this.allProduct[i];

      if (element._id == product.productId) {
        this.allProduct.splice(i, 1);
        this.cartlength = this.allProduct.length;
      }
    }
  }

  plus(i: any) {
    const product = {
      index: i,
      productId: this.cart[i].productId,
      quantity: this.cart[i].quantity,
    };
    const token = localStorage.getItem('userToken');

    if (this.allProduct[i].quantity == this.cart[i].quantity) {
      this.cart[i].quantity === this.allProduct[i].quantity;
      product.quantity = this.cart[i].quantity;
      this.UserService.changeQuantityOfProductInCart(token, product).subscribe(
        (data: any) => {
          this.SharedService.sendClickEvent();
        }
      );
    } else {
      this.cart[i].quantity++;
      product.quantity = this.cart[i].quantity;

      this.UserService.changeQuantityOfProductInCart(token, product).subscribe(
        (data: any) => {
          this.SharedService.sendClickEvent();
        }
      );
    }
  }

  minuus(i: any) {
    const token = localStorage.getItem('userToken');
    const deletedproduct = {
      productId: this.cart[i].productId,
    };

    if (this.cart[i].quantity === 0) {
      this.cart[i].quantity = 0;

    } else {
      this.cart[i].quantity--;
      const product = {
        index: i,
        productId: this.cart[i].productId,
        quantity: this.cart[i].quantity,
      };

      this.UserService.changeQuantityOfProductInCart(token, product).subscribe(
        (data: any) => {
          this.SharedService.sendClickEvent();
        }
      );
    }
  }

  ondrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    const token = localStorage.getItem('userToken');

    const data = {
      allProduct: this.allProduct,
    };
    this.UserService.saveAfterDrag(token, data).subscribe((data: any) => {});
  }

   Subtotal() {
     if (this.allProduct.length == 0) {
      this.Total = 0;
    } else {
      const cc = [];
        for (let i = 0; i < this.cart.length; i++) {
        const element = this.cart[i];
        const product = this.allProduct.filter(
          (item: any) => item._id == element.productId,
        );
        const orderPrice = element.quantity * product[0].price;

        cc.push(orderPrice);
      }
      let sum = 0;
      let i = 0;
      while (i < cc.length) {
        sum += cc[i];
        i++;
      }
      this.Total = sum;

    }
  }

}




