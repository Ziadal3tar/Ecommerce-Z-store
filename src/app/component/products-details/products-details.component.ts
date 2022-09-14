import { StoresService } from './../../services/stores.service';
import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { UserService } from '../../services/user.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent implements OnInit {
  cartlength: any;

  productId: any;

  theProduct: any;

  storeData:any

  indexx = 0;
  indexx1=0
  openImg="d-none"

  activeImg = 'activeImg';

  theNumberOfPieces: any = 1;

  message = '.';

  userData: any;

  token = localStorage.getItem('userToken');

  sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  constructor(
    private _activatedRoute: ActivatedRoute,
    private ProductsService: ProductsService,
    private Router: Router,
    private UserService: UserService,
    private StoresService:StoresService
  ) {
    this.productId = _activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getdata();
    this.getProduct();
    this.UserService.getUserData(this.token).subscribe((data: any) => {
      this.userData = data.userData;
    });
  }
  getdata() {
    this.UserService.getUserData(localStorage.getItem('userToken')).subscribe(
      (data: any) => {
        console.log(data);
        this.userData = data.userData;
      }
    );
  }
  getProduct() {
    this.ProductsService.getProductById(this.productId).subscribe(
      (data: any) => {
        this.theProduct = data.product;
        this.getStore()
      }
    );
  }

  getStore(){
    this.StoresService.getStore(this.theProduct.storeId).subscribe((data:any)=>{
      this.storeData = data.store
      console.log(data);

    })
  }

  changeimg(i: any) {
    this.indexx = i;
    this.indexx1 = i
  }
  changeimg1(i: any) {
    this.indexx1 = i;
  }

  deleteProduct() {
    const product = {
      productId: this.productId,
    };
    this.ProductsService.deleteProductById(this.productId).subscribe(
      (data: any) => {
        this.UserService.deleteFromCart(this.token, product).subscribe(
          (data: any) => {}
        );

        const page = data.product.forWhom;

        this.Router.navigate([`/${page}`]);
      }
    );
  }

  plus() {
    if (this.theNumberOfPieces >= this.theProduct.quantity) {
      this.message = "We don't have more";
      this.theNumberOfPieces = this.theProduct.quantity;
    } else if (this.theProduct.quantity >= 0) {
      this.message = '.';
      this.theNumberOfPieces++;
    } else {
      this.theNumberOfPieces++;
    }
  }

  minuus() {
    if (this.theNumberOfPieces == 0) {
      this.theNumberOfPieces = 0;
      this.message = 'How many do you need';
    } else {
      this.theNumberOfPieces--;
      this.message = '.';
    }
  }

  addToCart() {
    if (this.theNumberOfPieces === 0) {
      this.message = 'How many do you need';
    } else {
      this.message = '.';

      const product = {
        productId: this.productId,
        quantity: this.theNumberOfPieces,
      };
      const token = localStorage.getItem('userToken');

      this.UserService.addToCart(product, token).subscribe((data: any) => {
        this.cartlength = data.addInCart.cart.length;
      });
    }
  }
}
