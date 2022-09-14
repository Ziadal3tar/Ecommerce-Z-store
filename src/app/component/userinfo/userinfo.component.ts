import { StoresService } from './../../services/stores.service';
import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css'],
})
export class UserinfoComponent implements OnInit {
  orders = 'd-none';
  favorites = 'd-none';
  personal = 'd-none';
  settings = 'd-none';
  ordersStyle = '';
  favoritesStyle = '';
  personalStyle = '';
  userdata: any;
  storDetails = 'd-none';
  image: any;
  storeName = '';
  storeCategory = '';
  storeTitle = '';
  removeTitle = '';
  edit = '';
  url: any;
  page: any;
  updatedImg: any;
  name = 'mohammed';
  favcount:any;
  ordersCount:any

  constructor(
    private SharedService: SharedService,
    private _activatedRoute: ActivatedRoute,
    private UserService: UserService,
    private StoresService: StoresService,
    private Router: Router
  ) {}

  ngOnInit(): void {
    this.pageNavigation(this._activatedRoute.snapshot.url[1].path);
    this.userData();
  }

  pageNavigation(page: any) {
    this.page = page;

    if (page == 'orders') {
      this.ordersStyle = 'ifClick';
      this.personalStyle = '';
      this.favoritesStyle = '';
      this.orders = '';
      this.settings = 'd-none';
      this.favorites = 'd-none';
      this.personal = 'd-none';
    } else if (page == 'settings') {
      this.settings = '';
      this.orders = 'd-none';
      this.favorites = 'd-none';
      this.personal = 'd-none';
    } else if (page == 'favorites') {
      this.ordersStyle = '';
      this.personalStyle = '';
      this.favoritesStyle = 'ifClick';

      this.settings = 'd-none';
      this.orders = 'd-none';
      this.favorites = '';
      this.personal = 'd-none';
    } else if (page == 'personal') {
      this.ordersStyle = '';
      this.personalStyle = 'ifClick';
      this.favoritesStyle = '';
      this.settings = 'd-none';
      this.orders = 'd-none';
      this.favorites = 'd-none';
      this.personal = '';
    }
  }

  userData() {
    this.UserService.getUserData(localStorage.getItem('userToken')).subscribe(
      (data: any) => {
        this.userdata = data.userData;
this.favcount= this.userdata.favoriteProducts.length
this.ordersCount= this.userdata.cart.length

        this.url = this.userdata.profilePic[0];
        this.storeBtnTitle();
      }
    );
  }

  upload(event: any) {
    const file = event.target.files[0];
    this.image = file;
  }
  addStore() {

    const formdata = new FormData();
    formdata.append('file', this.image);

    formdata.append('storeCategory', this.storeCategory);
    formdata.append('storeName', this.storeName);
    formdata.append('createdBy', this.userdata._id);

    this.StoresService.addStores(formdata).subscribe((data: any) => {
      this.storeTitle = 'Open Your Store';
      this.removeTitle = 'delete-store';
      this.Router.navigate([`/yourStore/${data.addedStores._id}`]);
    });
  }

  storeBtnTitle() {
    if (!this.userdata.store) {
      this.storeTitle = 'Add your store';
      this.removeTitle = '';
    } else {
      this.storeTitle = 'Open Your Store';
      this.removeTitle = 'deleteStore';
    }
  }
  storeBtn() {
    if (this.storeTitle == 'Add your store') {
      if (this.storDetails == 'd-none') {
        this.storDetails = '';
      } else {
        this.storDetails = 'd-none';
      }
    } else {
      this.Router.navigate(['/yourStore/' + this.userdata.storeId]);

      this.storDetails = 'd-none';
    }
  }

  deleteStore() {
    const id = this.userdata._id;
    if (this.userdata.store) {
      this.StoresService.deleteStore(id).subscribe((data: any) => {
        if (data.message == 'removed') {
          this.storeTitle = 'Add your store';
          this.removeTitle = '';
        }
      });
    }
  }

  uploads(event: any) {
    this.edit = 'edit';
    const file = event.target.files[0];
    this.updatedImg = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };
  }
  save() {
    this.edit = '';
    const formdata = new FormData();

    formdata.append('file', this.updatedImg);
    formdata.append('id', this.userdata._id);

    this.UserService.editProfilePic(formdata).subscribe((data: any) => {});
  }
  cancel() {
    this.edit = '';

    this.url = this.userdata.profilePic[0];
  }
}
