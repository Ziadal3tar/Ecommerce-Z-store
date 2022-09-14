import { StoresService } from './../../services/stores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-your-store',
  templateUrl: './your-store.component.html',
  styleUrls: ['./your-store.component.css'],
})
export class YourStoreComponent implements OnInit {
  storeId: any;
  storeData: any;
  userdata: any;
  Products = 'active';
  Setting = '';
  addProduct=''
  chats=''
  lis = ['Setting', 'Datiles', 'Message'];
  dnone = 'd-none';
  loading=""
  position = 'bottom0';
  color:any
  constructor(
    private UserService: UserService,
    private Router: Router,
    private _activatedRoute: ActivatedRoute,
    private StoresService: StoresService,

  ) {
    this.storeId = _activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    const target = document.querySelector(".tw")
    setTimeout(() => {
      window.scrollTo(0,515);
    }, 4000);
    setTimeout(() => {
this.dnone=""
this.loading="d-none"
    }, 3800);
    this.Position();
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
    this.StoresService.getStore(this.storeId).subscribe((data: any) => {
      this.storeData = data.store;
      this.color = data.store.color    });
  }
  active(item: any) {

    if (item == 'Products') {
      this.Products = 'active';
      this.Setting = '';
      this.chats = '';
      this.addProduct=''
    }  else if (item == 'Setting') {
      this.Products = '';
      this.Setting = 'active';
      this.addProduct=''
      this.chats = '';
    }
    else if (item == 'addProduct') {
      window.scrollTo(0,515);
      this.Products = '';
      this.Setting = '';
      this.chats = '';
      this.addProduct='active'
    }else if (item == 'chats') {
      window.scrollTo(0,515);
      this.Products = '';
      this.Setting = '';
      this.addProduct=''
         this.chats='active'
 }
    else {
      this.Products = '';
      this.Setting = '';
      this.addProduct=''
      this.chats = 'active';
    }
  }
  Position() {


      setTimeout(() => {
        this.position = 'top0';
      }, 500);
      setTimeout(() => {
      this.position = 'bottom0';
    }, 1000);

    setTimeout(() => {
      this.position = 'top0';
    }, 1500);
    setTimeout(() => {
      this.position = 'bottom0';
    }, 2000);
    setTimeout(() => {
      this.position = 'top0';
    }, 2500);
    setTimeout(() => {
      this.position = 'bottom0';
    }, 3000);

  }
}
