import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})

export class AdminComponent implements OnInit {
  productadded: any
  productImg:any
  mainimg: any;

  title: any;

  description: any;

  price: any;

  sale: any;

  category: any;

  forWhom: any;

  files: any;

  quantity: any;

  S = false;

  M = false;

  L = false;

  IXL = false;

  IIXL = false;

  IIIXL = false;

  IVXL = false;

  VXL = false;

  hide = 'd-none';
  added="added1"
  userdata:any



  constructor(private ProductsService: ProductsService,private UserService:UserService) {}

  ngOnInit(): void {
this.getdata()
  }

  getdata() {
    const token = localStorage.getItem('userToken');
    this.UserService.getUserData(token).subscribe((data: any) => {
      this.userdata = data.userData;
    });
  }

  forwhom(type: string) {
    this.forWhom = type;
  }

  getcategory(category: any) {
    this.category = category;
  }

  uploads(event: any) {
    this.hide = '';

    const { files } = event.target;
    this.files = files;
    // ------------
    const imgs: any[] = [];
    for (let i = 0; i < this.files.length; i++) {
      if (i == 0) {
        const element = this.files[i];
        const reader = new FileReader();
        reader.readAsDataURL(element);
        reader.onload = (event: any) => {
          this.mainimg = event.target.result

        };
      }


    }
    for (let i = 0; i < this.files.length; i++) {
      const element = this.files[i];
      const reader = new FileReader();
      reader.readAsDataURL(element);
      reader.onload = (event: any) => {
        imgs.push(event.target.result);

      };

    }

    this.productImg = imgs;

  }
  imgs(imgs: any) {
    throw new Error('Method not implemented.');
  }

  addProduct():void {
    this.added = "added s"

    if (this.files != undefined) {
      this.hide = '';
    }
    const productdetails: any = {
      title: this.title,
      description: this.description,
      price: this.price,
      sale: this.sale,
      category: this.category,
      forWhom: this.forWhom,
      quantity: this.quantity,
    };

    const Sizes: any = {
      S: this.S,
      M: this.M,
      L: this.L,
      IXL: this.IXL,
      IIXL: this.IIXL,
      IIIXL: this.IIIXL,
      IVXL: this.IVXL,
      VXL: this.VXL,
    };
    const formdata = new FormData();
    for (let i = 0; i < this.files?.length; i++) {
      const element: any = this.files[i];
      formdata.append('file', element);
    }
    formdata.append('storeId', this.userdata.storeId);
    formdata.append('title', this.title);
    formdata.append('description', this.description);
    formdata.append('price', this.price);
    formdata.append('sale', this.sale);
    formdata.append('category', this.category);
    formdata.append('forWhom', this.forWhom);
    formdata.append('quantity', this.quantity);
    formdata.append('S', Sizes.S);
    formdata.append('M', Sizes.M);
    formdata.append('L', Sizes.L);
    formdata.append('IXL', Sizes.IXL);
    formdata.append('IIXL', Sizes.IIXL);
    formdata.append('IIIXL', Sizes.IIIXL);
    formdata.append('IVXL', Sizes.IVXL);
    formdata.append('VXL', Sizes.VXL);

    this.ProductsService.addproduct(formdata).subscribe((data: any) => {
      this.productadded = data.addedProduct;
      this.mainimg = data.addedProduct.productImg[0];
      this.added="added"
      setTimeout(() => {
        this.added = "added1  opacity-0"
    }, 2000);
    });
  }

}

