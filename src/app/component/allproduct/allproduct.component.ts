import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { StoresService } from './../../services/stores.service';
import { UserService } from './../../services/user.service';
import { Options, LabelType } from 'ng5-slider';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../services/products.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.css'],
})
export class AllproductComponent implements OnInit {
  products: any = [];
  userdata: any;
  storeData: any;
  storeId:any

  @Output() Setting: EventEmitter<any> = new EventEmitter<any>();
  @Output() Products: EventEmitter<any> = new EventEmitter<any>();

  minValue: number = 2000;

  maxValue: number = 8000;

  options: Options = {
    floor: 100,
    ceil: 10000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return `<b>Min price:</b> $${value}`;
        case LabelType.High:
          return `<b>Max price:</b> $${value}`;
        default:
          return `$${value}`;
      }
    },
  };

  imgProduct: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    navSpeed: 700,
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
  };

  constructor(
    private ProductsService: ProductsService,
    private UserService: UserService,
    private StoresService: StoresService,
    private SharedService:SharedService,
    private _activatedRoute: ActivatedRoute,

  ) {    this.storeId = _activatedRoute.snapshot.params['id'];
}

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.UserService.getUserData(localStorage.getItem('userToken')).subscribe(
      (data: any) => {
        this.userdata = data.userData;
        this.getStore();
      }
    );
  }
  getStore() {
    this.StoresService.getStore(this.storeId).subscribe(
      (data: any) => {
        this.storeData = data.store;
        this.getProduct();
      }
    );
  }

  getProduct() {
    for (let i = 0; i < this.storeData.storeProduct.length; i++) {
      const element = this.storeData.storeProduct[i];
      this.ProductsService.getProductById(element.productId).subscribe(
        (data: any) => {
          this.products.push(data.product);
        }
      );
    }
  }
  toSettings() {
    this.Setting.emit('active');
    this.Products.emit('');
  }
  // filter(type:any){
  //   this.getProduct()
  //   this.products = this.products.filter((item:any)=>item.category == type)
  // }

  addToCart(id: any) {
    const product = {
      productId: id,
      quantity: 1,
    };
    const token = localStorage.getItem('userToken');

    this.UserService.addToCart(product, token).subscribe((data: any) => {
      this.SharedService.sendClickEvent();
      this.getUser();
    });
  }

  addToFavorites(id: any) {
    this.SharedService.addFavorites(id);
  }
}
