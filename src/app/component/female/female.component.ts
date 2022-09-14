import { SharedService } from 'src/app/services/shared.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-female',
  templateUrl: './female.component.html',
  styleUrls: ['./female.component.css'],
})
export class FemaleComponent implements OnInit {
  products: any = [];

  femalecategory: any = this.ProductsService.femaleCategory;

  index: any;

  specifiedCategory: any;

  cartlength: any;

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

  constructor(
    private ProductsService: ProductsService,
    private http: HttpClient,
    private Router: Router,
    private SharedService: SharedService,
    private UserService: UserService,
  ) {}

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
        if (element.forWhom === 'female') {
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
          (item: any) => item.forWhom === 'female'
            && item.price >= this.minValue
            && item.price <= this.maxValue,
        );
      });
    } else {
      this.specifiedCategory = i;
      const category = this.femalecategory[i];
      this.ProductsService.getProduct().subscribe((data: any) => {
        this.products = data.allproduct.filter(
          (item: any) => item.forWhom === 'female'
            && item.category === category
            && item.price >= this.minValue
            && item.price <= this.maxValue,
        );
      });
    }
  }

  filterPrice() {
    const category = this.femalecategory[this.specifiedCategory];
    this.ProductsService.getProduct().subscribe((data: any) => {
      this.products = data.allproduct.filter(
        (item: any) => item.forWhom === 'female'
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

  addToCart(id: any) {
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

  addToFavorites(id: any) {
    this.SharedService.addFavorites(id);
  }
}
