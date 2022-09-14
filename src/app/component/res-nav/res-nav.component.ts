import { UserService } from './../../services/user.service';
import {
  Component, OnInit, Input, Output, EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-res-nav',
  templateUrl: './res-nav.component.html',
  styleUrls: ['./res-nav.component.css'],
})
export class ResNavComponent implements OnInit {
  page = '';

  shop = '';
userdata:any
  @Input() role :any;

@Input() s0 = 'before';

@Output() backNav: EventEmitter<any> = new EventEmitter<any>();

constructor(private UserService:UserService) {}

ngOnInit(): void {

}
getdata() {
  const token = localStorage.getItem('userToken');
  this.UserService.getUserData(token).subscribe((data: any) => {
    this.userdata = data.userData;


  });


}

back() {
  this.s0 = 'before';
  this.backNav.emit(this.s0);
}

cc(type: any) {
  if (type == 'page') {
    if (this.page == '') {
      this.page = 'h-auto';
    } else {
      this.page = '';
    }
  } else if (type == 'shop') {
    if (this.shop == '') {
      this.shop = 'h-auto';
    } else {
      this.shop = '';
    }
  }
}
}
