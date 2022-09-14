import { StoresService } from './../../services/stores.service';
import {
  Component,
  HostListener,
  Input,
  OnInit,
  Output,
  NgModule,
} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../services/products.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  i = 0;

  c = 0;

  clas = '';

  center = 'center';

  right = 'right';

  left = 'left';

  cartlength: any;

  nextCustomerClasses = '';

  backCustomerClasses = '';

  owlClass: any;

  feedbaclClass: any = 'd-none';

  feedBackButtonClass: any = 'btn btn-light text-danger';

  allUser = [];

  userdata: any;

  specialoffers: any = [];

  Customer: any = [
    {
      img: '../../../assets/1.jpg',
      name: 'doha mohamed',
      role: 'Customer',
      oppinion: "kja'vn aj'vnoa c'aknva a jovna ",
    },
    {
      img: '../../../assets/2.jpg',
      name: 'atef ali ',
      role: 'Customer',
      oppinion: "kja'vn aj'vnoa c'a gfgdf dfd sdfs knva a jovna ",
    },
    {
      img: '../../../assets/3.jpg',
      name: 'khalid mohamed',
      role: 'Customer',
      oppinion: "kja'vn aj'vnoad dgd gvd gv dgv c'aknva a jovna ",
    },
    {
      img: '../../../assets/1-2.jpg',
      name: 'tarqe ayman',
      role: 'Customer',
      oppinion: "kja'vn aj'vno dgs gsg  gr dgeg a c'aknva a jovna ",
    },
    {
      img: '../../../assets/image-avatar.png',
      name: 'abrahem mahmoud mohamed',
      role: 'Customer',
      oppinion:
        "kjaedr g d bd bdbd vfbf bbrb fb rb rbrb rb rbrb njij jn iojj opkdvm owefnwpienf wepwfmwe 'vn aj'vnoa c'aknva a jovna ",
    },
  ];

  offers: any = [
    {
      img: '../../../assets/joyful-girl-with-curly-brown-hair-dancing-purple-background-with-kissing-face-expression_197531-7071.webp',
      sale: 16,
      price: 143,
      name: "kja'vn aj'vnoa ",
    },
    {
      img: '../../../assets/woman-model-business-suit-wearing-hat_1303-17693.webp',
      sale: 42,
      price: 100,
      name: "kja'vna ",
    },
    {
      img: '../../../assets/high-fashion-portrait-young-elegant-blonde-woman-black-wool-hat-wearing-oversize-white-fringe-poncho-with-long-grey-dress_273443-3799.webp',
      sale: 36,
      price: 600,
      name: "kja'va ",
    },
    {
      img: '../../../assets/surprised-girl-pink-culottes-posing-with-trolley-full-multi-colored-packages-with-new-clothes_197531-14251.webp',
      sale: 10,
      price: 86,
      name: "kja'vn aj'vnoaa ",
    },
    {
      img: '../../../assets/modern-pretty-girl-beige-coat-standing-near-building-outdoor-glamorous-sunglasses-her-face-makeup-stylish-tail-hairstyle-hand-near-face-lot-summer-light-last-warm-days_343629-69.webp',
      sale: 50,
      price: 632,
      name: 'kja ',
    },
  ];

  customer: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 1000,
    navText: [
      '<i class="fa-solid fa-left-long fs-4 "></i>',
      '<i class="fa-solid fa-right-long fs-4"></i>',
    ],
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
    nav: true,
  };

  sales: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 800,
    navText: [
      '<i class="fa-solid fa-left-long fs-4 "></i>',
      '<i class="fa-solid fa-right-long fs-4"></i>',
    ],
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

  theOffers: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 900,
    autoplay: true,
    autoplaySpeed: 700,
    navText: [
      '<i class="fa-solid fa-left-long fs-6 "></i>',
      '<i class="fa-solid fa-right-long fs-6"></i>',
    ],
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
    nav: true,
  };

  constructor(
    private UserService: UserService,
    private ProductsService: ProductsService,
    private StoresService: StoresService
  ) {}

  ngOnInit(): void {
    this.getSpecialOffers();
    this.getdata()

  }

  getdata() {
    const token = localStorage.getItem('userToken');
    this.UserService.getUserData(token).subscribe((data: any) => {
      this.userdata = data.userData;
      this.getStore();
      this.getfavandcart()

    });


  }
  getStore() {

      const storeId = this.userdata?.storeId;

      if (storeId) {


      this.StoresService.getStore(storeId).subscribe((data: any) => {
        if (data.message == 'notFound') {
          const data = {
            id: this.userdata._id,
          };
          this.StoresService.storDeleted(data).subscribe((data: any) => {});
        }
      });
    }
  }

getfavandcart(){
  const favArr = this.userdata?.favoriteProducts
  const cartArr = this.userdata?.cart
  const allArr = favArr.concat(cartArr)
  for (let i = 0; i < allArr.length; i++) {
    const element = allArr[i];
    this.ProductsService.getProductById(element.productId).subscribe((data:any)=>{
      if (data.message=="notFounded") {
        const data = {
          userid: this.userdata._id,
          productid: element.productId
        };
        this.ProductsService.ifDeletedProduct(data).subscribe((data)=>{
        })
      }
    })
  }
}

  nextoppinion() {
    if (this.c == this.Customer.length - 1) {
      this.c = 0;
    } else {
      this.c++;
    }
    this.backCustomerClasses = '';
    this.nextCustomerClasses = 'nextCustomerClasses';
    this.backCustomerClasses = '';
  }

  backoppinion() {
    this.nextCustomerClasses = '';
    this.backCustomerClasses = 'backCustomerClasses';
    this.nextCustomerClasses = '';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY === 72) {
    }
  }

  addFeedback() {
    if (this.owlClass === undefined) {
      this.owlClass = 'd-none';
      this.feedbaclClass = undefined;
      this.feedBackButtonClass = 'btn btn-danger text-light';
    } else if (this.owlClass != undefined) {
      this.owlClass = undefined;
      this.feedbaclClass = 'd-none';
      this.feedBackButtonClass = 'btn btn-light text-danger';
    }
  }

  getSpecialOffers() {
    this.ProductsService.getProduct().subscribe((data: any) => {
      for (let i = 0; i < data.allproduct.length; i++) {
        const element = data.allproduct[i];
        if (element.isSpecial) {
          this.specialoffers.push(element);
        }
      }
    });
  }
}
