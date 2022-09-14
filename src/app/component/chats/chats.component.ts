import { UserService } from './../../services/user.service';
import { ChatService } from './../../services/chat.service';
import { StoresService } from './../../services/stores.service';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  userdata: any;
  storeData: any;
  num = 5;
  theChat: any;
  message = '';
  storeId: any;
  from: any;
  to: any;
  chatsArr: any[] = [];
  chatsData: any[] = [];
  openChats = false;
  half2Style = 'd-none';
  displayChat: any[] = [];
  reqs: any[] = [];
  allChats: any[] = [];
  chatMessages: any[] = [];

  @ViewChildren('chat') chat: QueryList<any> | any;
  @ViewChild('chats') chats: ElementRef | any;
  receiverData: any;
  reqHeight = '';
  direction = 'fa-solid fa-caret-up';

  constructor(
    _activatedRoute: ActivatedRoute,
    private StoresService: StoresService,
    private ChatService: ChatService,
    private UserService: UserService
  ) {
    this.storeId = _activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getUser();
    this.ChatService.listen('resevMessage').subscribe((data: any) => {
      this.chatMessages.push(data);

      if(data.from == "user"){
        console.log(this.reqs);

        for (let i = 0; i < this.reqs.length; i++) {
          const element = this.reqs[i];
          if(data.sendBy == element._id){
            console.log("gg")
            return
          }

        }
this.UserService.getUserById(data.sendBy).subscribe((Data:any)=>{
  console.log(this.reqs);
  console.log(Data)
  this.reqs.push(Data.userData)

})
      }
    });
  }

  handelChats() {
    if (this.userdata?.storeId == this.storeId) {
      for (let i = 0; i < this.storeData.chats.length; i++) {
        const element = this.storeData.chats[i];
        this.ChatService.getChat(element).subscribe((data: any) => {
          this.allChats.push(data?.chatData);

          this.UserService.getUserById(data?.chatData.userId).subscribe(
            (data: any) => {
              this.reqs.push(data.userData);
            }
          );
        });
      }
    } else {
      for (let i = 0; i < this.userdata.chats.length; i++) {
        const element = this.userdata.chats;
        console.log(element);
        this.ChatService.getChat(element).subscribe((data:any)=>{
          console.log(data);
          if (data.chatData.storeId == this.storeId) {
            for (let i = 0; i < data.chatData.messages.length; i++) {
              const message = data.chatData.messages[i];
              this.ChatService.getMessage(message).subscribe((data: any) => {
                this.chatMessages.push(data.messageData);
              });
            }
          }

        })

      }
    }
  }
  getChatMessages() {
    if (this.userdata?.storeId == this.storeId) {
      for (let i = 0; i < this.allChats.length; i++) {
        const element = this.allChats[i];

        if (element.userId == this.reqs[this.theChat]._id) {
          for (let i = 0; i < element.messages.length; i++) {
            const message = element.messages[i];
            this.ChatService.getMessage(message).subscribe((data: any) => {
              this.chatMessages.push(data.messageData);
            });
          }
        }
      }
    }
  }

  goToDown() {
    this.chats.nativeElement.scrollTop = this.chats.nativeElement.scrollHeight;
  }
  getUser(): void {
    this.UserService.getUserData(localStorage.getItem('userToken')).subscribe(
      (data: any) => {
        this.userdata = data.userData;
        if (this.userdata.storeId != this.storeId) {
          this.half2Style = '';
        }
        this.getStore();
        if (this.userdata?.storeId != this.storeId) {
        }
      }
    );
  }
  getStore() {
    this.StoresService.getStore(this.storeId).subscribe((data: any) => {
      this.storeData = data.store;
      // this.getChatsData();
      this.handelChats();
    });
  }

  send() {
    if (this.storeId == this.userdata.storeId) {

      this.UserService.getUserById(this.receiverData?.userId).subscribe(
        (data: any) => {
          console.log(data);

          const Data = {
            from: 'store',
            userId: data.userData?._id,
            storeId: this.storeId,
            sendBy: this.storeId,
            sendTo: data.userData?._id,
            content: this.message,
            time: new Date().toDateString(),
          }

          this.ChatService.emit('sendMessage', Data);
          this.message = '';
          this.chatMessages.push(Data);

          this.ChatService.initChat(Data).subscribe(() => {});
        }
      );
    } else {
      const Data = {
        from: 'user',
        userId: this.userdata._id,
        storeId: this.storeId,
        sendBy: this.userdata._id,
        sendTo: this.storeId,
        content: this.message,
        time: new Date().toDateString(),

      };

      this.chatMessages.push(Data);

      this.ChatService.emit('sendMessage', Data);
      this.message = '';

      this.ChatService.initChat(Data).subscribe(() => {});
    }
  }
  openChat(i: any) {
    this.theChat = i;

    this.getChatMessages();
    this.receiverData = this.allChats[i];
    setTimeout(() => {
      this.half2Style = 'offset-md-1 offset-sm-0';
      this.responsive();
    }, 1000);
    this.UserService.getUserById(this.reqs[i]?._id).subscribe((data: any) => {
      const userChats = data.userData.chats;
      const storeChats = this.storeData.chats;
    });
  }

  closeChat() {
    this.half2Style = 'd-none';
    this.responsive();
  }
  responsive() {
    if (window.innerWidth <= 768) {
      if (this.reqHeight == '') {
        this.direction = 'fa-solid fa-caret-down';
        this.reqHeight = 'reqHeight';
      } else {
        this.reqHeight = '';
        this.direction = 'fa-solid fa-caret-up';
      }
    }
  }
}
