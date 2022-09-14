import { StoresService } from './../../services/stores.service';
import {
  Component, OnInit, HostListener, Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { CartOnAllComponent } from '../cart-on-all/cart-on-all.component';
import { ProductsService } from '../../services/products.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService],
})
export class NavbarComponent implements OnInit {
  navHeight = 'empty';

  @Input() cartlength :any;

  toUp = false;

  onScroll = 'navbar-light';

  ScrollY = 0;

  numberInCart: any;

  islogin = '';

  e0 = '';

  s0 = 'before';

  userdatiles = 'd-none';

  cart: any;

  allProduct: any = [];

  subtotal: any = 0;

  userData: any;

  opensearch="d-none"

  nameSearch:any

  searched:any=[]
  constructor(
    private router: Router,
    private UserService: UserService,
    private ProductsService: ProductsService,
    private StoresService:StoresService
  ) {}

  ngOnInit(): void {
    if (localStorage.length >= 1) {
      this.getUserData();
      this.getdata();
    }
  }


  getdata() {
    const token = localStorage.getItem('userToken');
    this.UserService.getUserData(token).subscribe((data: any) => {
      this.getStore()
      this.getfavandcart()
      this.cartlength = data.userData.cart.length;
      this.cart = data.userData.cart;
      this.userData = data.userData;
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
  getStore() {

    const storeId = this.userData?.storeId;

    if (storeId) {


    this.StoresService.getStore(this.userData.storeId).subscribe((data: any) => {
      if (data.message == 'notFound') {
        const data = {
          id: this.userData._id,
        };
        this.StoresService.storDeleted(data).subscribe((data: any) => {});
      }
    });
  }
}

getfavandcart(){
const favArr = this.userData?.favoriteProducts
const cartArr = this.userData?.cart
const allArr = favArr?.concat(cartArr)
for (let i = 0; i < allArr.length; i++) {
  const element = allArr[i];
  this.ProductsService.getProductById(element.productId).subscribe((data:any)=>{
    if (data.message=="notFounded") {
      const data = {
        userid: this.userData._id,
        productid: element.productId
      };
      this.ProductsService.ifDeletedProduct(data).subscribe((data)=>{
        this.getdata()
      })
    }
  })
}
}

  Subtotal() {
    this.e0 = 'end-0';

    if (this.subtotal == 0) {
      for (let i = 0; i < this.cart.length; i++) {
        const element = this.cart[i];
        const product = this.allProduct.filter(
          (item: any) => item?._id == element.productId,
        );
        const orderPrice = element.quantity * product[0].price;
        this.subtotal += orderPrice;
      }
    }
  }

  showNav() {
    this.s0 = 'after';
  }

  dropShop(name: string) {}

  @HostListener('window:scroll', [])
  toKnowHeight() {
    this.ScrollY = window.scrollY;
    if (window.scrollY <= 40) {
      this.onScroll = 'navbar-light ';
    } else if (window.scrollY > 40) {
      this.onScroll = ' opacity-75 bg-black  text-white navbar-dark position-fixed py-2 top-0 mt-0';
    }
  }

  clearLocalS() {
    localStorage.clear();
  }

  getUserData() {
    const token = localStorage.getItem('userToken');
    this.UserService.getUserData(token).subscribe((data: any) => {
      this.userData = data.userData;
    });
  }
  openSearch(){
    if (this.opensearch == "") {
      this.opensearch = "d-none"
      this.nameSearch=""
      this.search()
    }else{
      this.opensearch = ""

    }

  }
  search(){

    const data = {
      name: this.nameSearch,
    };
    this.StoresService.searchStore(data).subscribe((data:any)=>{
      this.searched=[]

      for (let i = 0; i < data.allstores.length; i++) {
        const element = data.allstores[i];
        if(this.nameSearch==""){
          this.searched=[]

        }else{

          this.searched.push(element)
        }


      }
    })

  }

  removeStore(id:any){
    this.StoresService.removeStore(id).subscribe((data:any)=>{
      console.log(data);
      if (data.message=="deleted") {
        this.searched = this.searched.filter(
          (item: any) => item?._id != id,
        );
this.StoresService.storDeleted(data.deletedStore.createdBy).subscribe((data)=>{})
for (let i = 0; i < data.deletedStore.storeProduct.length; i++) {
  const element = data.deletedStore.storeProduct[i];
  this.ProductsService.deleteProductById(element.productId).subscribe((data:any)=>{
  })


}
      }

    })
  }
}
