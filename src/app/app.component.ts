import { ChatService } from './services/chat.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cartlength:any;
userdata:any
  constructor(private UserService:UserService,private ChatService:ChatService) {


  }

  ngOnInit(): void {
    if (localStorage.getItem("userToken")) {
      this.getdata()
    }
  }

  getdata() {
    const token = localStorage.getItem('userToken');
    this.UserService.getUserData(token).subscribe((data: any) => {
      this.cartlength = data.userData?.cart.length;
      this.userdata = data.userData
this.updateSocketId()
    });
  }
  updateSocketId(){
    this.ChatService.emit("updateSocketId",this.userdata?._id)

  }
}
