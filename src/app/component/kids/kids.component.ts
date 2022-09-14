import { SharedService } from 'src/app/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../services/products.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css'],
})
export class KidsComponent implements OnInit {
  products: any = [];

  kidscategory:any = this.ProductsService.kidsCategory;

  cartlength:any;

  index: any;

  specifiedCategory :any;

  minValue: number = 100;

  maxValue: number = 10000;

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
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
  };

  constructor(private ProductsService:ProductsService, private SharedService:SharedService, private UserService:UserService) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getdata() {
    const token = localStorage.getItem('userToken');
    this.UserService.getUserData(token).subscribe((data: any) => {
      this.cartlength = data.userData.cart.length;
    });
  }

  getProduct() {
    this.ProductsService.getProduct().subscribe((data: any) => {
      for (let i = 0; i < data.allproduct.length; i++) {
        const element = data.allproduct[i];
        if (element.forWhom === 'kids') {
          this.products.push(element);
        }
      }
      this.specifiedCategory = 0;
    });
  }

  filter(i: any) {
    if (i === 0) {
      this.specifiedCategory = i;

      this.ProductsService.getProduct().subscribe((data: any) => {
        this.products = data.allproduct.filter(
          (item: any) => item.forWhom === 'kids'
            && item.price >= this.minValue
            && item.price <= this.maxValue,
        );
      });
    } else {
      this.specifiedCategory = i;
      const category = this.kidscategory[i];
      this.ProductsService.getProduct().subscribe((data: any) => {
        this.products = data.allproduct.filter(
          (item: any) => item.forWhom === 'kids'
            && item.category === category
            && item.price >= this.minValue
            && item.price <= this.maxValue,
        );
      });
    }
  }

  filterPrice() {
    const category = this.kidscategory[this.specifiedCategory];
    this.ProductsService.getProduct().subscribe((data: any) => {
      this.products = data.allproduct.filter(
        (item: any) => item.forWhom === 'kids'
          && item.category === category
          && item.price >= this.minValue
          && item.price <= this.maxValue,
      );
    });
  }

  getIndex(i: number) {
    this.index = i;
    this.filter(i);
  }

  addToCart(id:any) {
    const product = {
      productId: id,
      quantity: 1,
    };
    const token = localStorage.getItem('userToken');

    this.UserService.addToCart(product, token).subscribe((data: any) => {
      this.SharedService.sendClickEvent();
      this.getdata();
    });
  }

  addToFavorites(id:any) {
    this.SharedService.addFavorites(id);
  }
}
